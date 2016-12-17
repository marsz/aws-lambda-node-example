var validate = function(context, params) {
  var Account = require('../lib/account')
  var account = new Account(null)
  account.find_by_auth_code(params.auth_code, function(account, err) {
    if(account.exists == true && !account.is_authorized()) {
      account.validate(params.auth_code, function(account, err) {
        if(account.has_error()) {
          context.done(err)
        } else {
          context.done(null, { account_name: account.fb_uid, status: account.attrs.auth_status.S })
        }
      })
    } else {
      context.done('not exists or authorized')
    }
  })
}
module.exports.run = validate
