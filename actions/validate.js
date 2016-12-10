var validate = function(context, dynamodb, params) {
  var query_params = {
    TableName: 'accounts',
    Select: 'ALL_ATTRIBUTES',
    KeyConditionExpression: '#fb_uid = :fb_uid',
    ExpressionAttributeNames: {
      '#fb_uid': 'fb_uid'
    },
    ExpressionAttributeValues: {
      ':fb_uid': { S: params.fb_uid }
    }
  }
  return dynamodb.query(query_params, function(err, data) {
    if (err) {
      context.done(null, { fail: true })
    } else {
      var item = data.Items[0]
      if(item && item.auth_code['S'] == params.auth_code) {
        item.status.S = 'authorized'
        var put_params = {
          TableName: 'accounts',
          Item: item
        }
        dynamodb.putItem(put_params, function(err, data) {
          if(err == null)
            context.done(null, { status: item.status.S })
          else
            context.done(null, { fail: err })
        })
      } else {
        context.done(null, { fail: true })
      }
    }
  })
}
module.exports.run = validate
