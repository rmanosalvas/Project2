const AWS = require('aws-sdk');
const dotenv = require('dotenv').config();
// Enter copied or downloaded access ID and secret key here
const ID = process.env.AWS_ACCESS_KEY;
const SECRET = process.env.AWS_SECRET_ACCESS_KEY;

// The name of the bucket that you have created
const BUCKET_NAME = 'gw-project2-app';
const s3 = new AWS.S3({
    accessKeyId: ID,
    secretAccessKey: SECRET
});
const params = {
    Bucket: BUCKET_NAME,
    CreateBucketConfiguration: {
        // Set your region here
        LocationConstraint: "eu-west-1"
    }
};

s3.createBucket(params, function(err, data) {
    if (err) console.log(err, err.stack);
    else console.log('Bucket Created Successfully', data.Location);
});