# Pulumi AWS S3 Demo

This [Pulumi](https://www.pulumi.com/) demonstration creates an S3 bucket to host a static website then uploades a JPG image and an HTML file.

## Getting Started

1. Create two environment variables:
   1. `AWS_ACCESS_KEY_ID = "<YOUR_ACCESS_KEY_ID>"`
   1. `AWS_SECRET_ACCESS_KEY = "<YOUR_SECRET_ACCESS_KEY>"`
1. Clone this GitHub repository.
1. Install [Node.js](https://nodejs.org/en/).
1. Install [Pulumi](https://www.pulumi.com/docs/get-started/install/).
1. Create a [Pulumi service account](https://app.pulumi.com/).
1. Create a Pulumi access token `https://app.plumi.com/<your_org_name>/settings/tokens`.
1. In a command prompt, change directory to this demo project.
1. Install the Node.js dependencies by running `npm install`.
1. Run `pulumi stack init`.
1. Run `pulumi config set aws:region ap-southeast-2`.
1. Run `pulumi up`.
1. Open the output url in a browser.
1. Run `pulumi destroy`.
1. Run `pulumi stack rm`.

## Pulumi Commands

To create this project the following commands were used:

* `pulumi new <project_name>` - Creates a new Pulumi project with associated files.
* `pulumi up` - Executes the index.js file and deploys the stack or updates the stack.
* `pulumi stack output bucketName` - Displays the exported value of bucketName.
  * `curl $(pulumi stack output bucketEndpoint)` - An example of using the outputs.
* `pulumi destroy` - Deletes the stack resources.
* `pulumi stack rm` - Deletes the stack from the Pulumi service.