module.exports.handler = function(event, context) {

  var config = require('./config.json')
  var AWS = require('aws-sdk');
  AWS.config.update({
      region: config.aws.region,
      accessKeyId: config.aws.access_key_id,
      secretAccessKey: config.aws.secret_access_key
  })

  var dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' })

  var result = null
  switch(event.action) {
    case 'create':
      var action = require('./create')
      auth_code = action.run(dynamodb, event.params)
      context.done(null, { auth_code: auth_code })
      return auth_code
    case 'validate':
      var action = require('./validate')
      res = action.run(dynamodb, event.params)
      context.done(null, res)
  }
}
