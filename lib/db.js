var config = require('../config.json')
var AWS = require('aws-sdk');
AWS.config.update({
    region: config.aws.region,
    accessKeyId: config.aws.access_key_id,
    secretAccessKey: config.aws.secret_access_key
})

var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })
module.exports = dynamodb
