"use strict";
const fs = require("fs");
const pulumi = require("@pulumi/pulumi");
const aws = require("@pulumi/aws");
const awsx = require("@pulumi/awsx");

// Create an AWS resource (S3 Bucket) with website support
const bucket = new aws.s3.Bucket("my-bucket", {
    website: {
        indexDocument: "index.html"
    }
});

// Upload a jpg file
const imgObject = new aws.s3.BucketObject("roo.jpg", {
    bucket,
    source: new pulumi.asset.FileAsset("roo.jpg"),
    acl: "public-read",
    contentType: "image/jpeg"
})

// Upload the html file
const indexObject = new aws.s3.BucketObject("index.html", {
    bucket,
    source: new pulumi.asset.FileAsset("index.html"),
    acl: "public-read",
    contentType: "text/html"
})

// Export the bucket details
module.exports.bucketName = bucket.id;
module.exports.bucketEndpoint = pulumi.interpolate`http://${bucket.websiteEndpoint}`;
module.exports.imageUrl = pulumi.interpolate`http://${bucket.websiteEndpoint}/roo.jpg`

