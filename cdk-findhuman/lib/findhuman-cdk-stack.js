const cdk = require('@aws-cdk/core')
const sfn = require('@aws-cdk/aws-stepfunctions')
const tasks = require('@aws-cdk/aws-stepfunctions-tasks')
const s3 = require('@aws-cdk/aws-s3')
const lambda = require('@aws-cdk/aws-lambda')
const { S3EventSource } = require('@aws-cdk/aws-lambda-event-sources')
const iam = require('@aws-cdk/aws-iam')

const mybucket = 'image-rekognition-bucket-' + Math.floor(Math.random() * 9999)

class FindHumanStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor (scope, id, props) {
    super(scope, id, props)

    const role = new iam.Role(this, 'rekognitionRole', {
      assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com')
    })

    const logPol = new iam.PolicyStatement()
    logPol.addAllResources()
    logPol.addActions([
      'logs:CreateLogGroup',
      'logs:CreateLogStream',
      'logs:PutLogEvents'
    ])
    role.addToPolicy(logPol)

    const rekPol = new iam.PolicyStatement()
    rekPol.addAllResources()
    rekPol.addActions('rekognition:*')
    role.addToPolicy(rekPol)

    const snsPol = new iam.PolicyStatement()
    snsPol.addAllResources()
    snsPol.addActions('sns:*')
    role.addToPolicy(snsPol)

    const s3Pol = new iam.PolicyStatement()
    s3Pol.addAllResources()
    s3Pol.addActions(['s3:Get*', 's3:List*'])
    role.addToPolicy(s3Pol)

    const rekFn = new lambda.Function(this, 'rekognitionFunction', {
      code: new lambda.AssetCode('rekognitionlambda'),
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(120),
      role
    })

    const humanFn = new lambda.Function(this, 'humanFunction', {
      code: new lambda.AssetCode('humanlambda'),
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(120),
      role
    })

    const processObject = new tasks.LambdaInvoke(this, 'Process Image', {
      lambdaFunction: rekFn
    })

    const success = new sfn.Succeed(this, 'We succeeded! Yay!')
    const fail = new sfn.Fail(this, 'Uh oh', {
      error: 'Someone made a boo boo'
    })
    const processHuman = new tasks.LambdaInvoke(this, 'Process Human', {
      lambdaFunction: humanFn
    })
    processHuman.next(success)

    const processOther = new sfn.Pass(this, 'Other Processing', {
      result: { other: 'other-detected' }
    })
    processOther.next(success)

    const checkHuman = new sfn.Choice(this, 'Human Found?')
    checkHuman.when(sfn.Condition.stringEquals('$.Payload.found', 'human'), processHuman)
    checkHuman.when(sfn.Condition.stringEquals('$.Payload.found', 'other'), processOther)
    const definition = processObject.next(checkHuman)
    const stm = new sfn.StateMachine(this, 'StateMachine', {
      definition,
      timeoutSec: 300
    })

    const bucket = new s3.Bucket(this, mybucket)

    const stmArn = stm.stateMachineArn
    const s3Fn = new lambda.Function(this, 's3Function', {
      code: new lambda.AssetCode('s3lambda'),
      runtime: lambda.Runtime.PYTHON_3_8,
      handler: 'index.handler',
      timeout: cdk.Duration.seconds(120),
      environment: {
        STEP_ARN: stmArn
      }
    })
    s3Fn.addEventSource(new S3EventSource(bucket, {
      events: [s3.EventType.OBJECT_CREATED]
    }))
    const s3FnPol = new iam.PolicyStatement()
    s3FnPol.addResources(stmArn)
    s3FnPol.addActions('states:StartExecution')
    s3Fn.addToRolePolicy(s3FnPol)
  }
}
exports.FindHumanStack = FindHumanStack
