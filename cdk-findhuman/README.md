# AWS CDK Find Human Demo

Detects people in pictures uploaded to an S3 bucket

This is a demonstration project for JavaScript development with CDK.

It creates an S3 bucket, two Lambda functions, and a Step Function. The Step Function is initiated
when an image is uploaded into the S3 bucket. If there is a human in the image detected by Rekognition,
an SMS is sent to the configured phone number.

## Getting Started

The `cdk.json` file tells the CDK Toolkit how to execute your app.

Prerequisites:

* `aws configure` - [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
* [Node.js](https://nodejs.org/en/)
* `npm install -g aws-cdk`
* `npm install`
* `aws sts get-caller-identity` - Retrieve your AWS account id
* `aws ec2 describe-regions` - Retrieve a list of regions
* `cdk bootstrap aws://ACCOUNT-NUMBER/REGION` - [CDK Bootstrapping](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html)

Changes required prior to deploying:

* Enter your phone number in `humanlambda/index.py`

## Useful commands

 * `npm run test` - Perform the jest unit tests (not complete in this repository).
 * `cdk deploy` - Deploy this stack to your default AWS account/region.
 * `cdk diff` - Compare deployed stack with current state.
 * `cdk synth` - Emits the synthesized CloudFormation template.
 * `cdk destroy` - Deletes the CloudFormation stack.

## New Project

```bash
mkdir my-project
cd my-project
cdk init app --language javascript
npm install @aws-cdk/core @aws-cdk/aws-s3 @aws-cdk/aws-lambda @aws-cdk/aws-lambda-event-sources @aws-cdk/aws-stepfunctions @aws-cdk/aws-stepfunctions-tasks
```

Copy the `lambda` directory and the `lib` directory into the new project.


