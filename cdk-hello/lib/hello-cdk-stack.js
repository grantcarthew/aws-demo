const cdk = require('@aws-cdk/core')
const sqs = require('@aws-cdk/aws-sqs')
const lambda = require('@aws-cdk/aws-lambda')
const eventSources = require('@aws-cdk/aws-lambda-event-sources')

class HelloCdkStack extends cdk.Stack {
  /**
   *
   * @param {cdk.Construct} scope
   * @param {string} id
   * @param {cdk.StackProps=} props
   */
  constructor (scope, id, props) {
    super(scope, id, props)

    // The code that defines your stack goes here
    const queue = new sqs.Queue(this, 'HelloQueue')

    const fn = new lambda.Function(this, 'HelloFunction', {
      code: new lambda.AssetCode('lambda'),
      runtime: lambda.Runtime.NODEJS_14_X,
      handler: 'index.handler'
    })

    fn.addEventSource(new eventSources.SqsEventSource(queue))
  }
}

module.exports = { HelloCdkStack }
