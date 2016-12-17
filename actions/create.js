var create = function(context, params) {

  var generate_auth_code = function() {
    var md5 = require('md5');
    var code = md5(Date.now())
    return code.substring(0, 8)
  }
  var auth_code = generate_auth_code()
  var Account = require('../lib/account')
  var account = new Account(params.account_name)
  var util = require('util')
  account.find(function(account, err) {
    if(account.has_error()) {
      context.done('find fail: '+util.inspect(err))
    } else {
      if(account.exists == true) {
        context.done('exists')
      } else {
        account.update({
          fb_uid: account.fb_uid,
          auth_code: auth_code,
          auth_status: 'unauthorized'
        }, function(account, err) {
          if(account.errors.length == 0) {
            context.done(null, { account_name: account.fb_uid, auth_code: auth_code })
          } else {
            context.done('create fail: '+util.inspect(err))
          }
        })
      }
    }
  })
  return auth_code
}
module.exports.run = create
