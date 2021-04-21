# AWS CDK Hello Demo

This is a demonstration project for JavaScript development with CDK.

It creates a simple Lambda function that is triggered by an SQS queue.

Review the Lambda logs in CloudWatch to see the function results.

## Getting Started

The `cdk.json` file tells the CDK Toolkit how to execute your app.

Prerequisites:

* `aws configure` - [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html)
* [Node.js](https://nodejs.org/en/)
* `npm install -g aws-cdk`
* `npm install`
* `aws sts get-caller-identity` - Retrieve your AWS account id
* `aws ec2 describe-regions` - Retrieve a list of regions
* `cdk bootstrap aws://ACCOUNT-NUMBER-1/REGION-1` - [CDK Bootstrapping](https://docs.aws.amazon.com/cdk/latest/guide/bootstrapping.html)

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
npm install @aws-cdk/core @aws-cdk/aws-s3 @aws-cdk/aws-lambda @aws-cdk/aws-lambda-event-sources
```

Copy the `lambda` directory and the `lib` directory into the new project.


