var create = function(dynamodb, params) {

  var generate_auth_code = function() {
    var md5 = require('md5');
    var code = md5(Date.now())
    return code.substring(0, 8)
  }

  var item = {
    'fb_uid': {
      'S': params.fb_uid
    },
    'auth_code': {
      'S': generate_auth_code()
    }
  }
  var attrs = {
    TableName: 'accounts',
    Item: item
  }
  return dynamodb.putItem(attrs, function(err, data) {
    if(err != {}) {
      return err
    }
  })
}
module.exports.run = create
