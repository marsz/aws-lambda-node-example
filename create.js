var create = function(dynamodb, params) {

  var generate_auth_code = function() {
    var md5 = require('md5');
    var code = md5(Date.now())
    return code.substring(0, 8)
  }
  var auth_code = generate_auth_code()
  var item = {
    'fb_uid': {
      'S': params.fb_uid
    },
    'auth_code': {
      'S': auth_code
    },
    'status': {
      'S': 'unauthorized'
    }
  }
  var attrs = {
    TableName: 'accounts',
    Item: item
  }

  var result = dynamodb.putItem(attrs, function(err, data) {
  })

  if(result.response.error == null) {
    return auth_code
  } else {
    return result
  }
}
module.exports.run = create
