var validate = function(context, params) {
  var Account = require('../lib/account')
  var account = new Account(params.fb_uid)
  account.find(function(account, err) {
    if(account.exists == true && !account.is_authorized()) {
      account.validate(params.auth_code, function(account, err) {
        if(account.has_error()) {
          context.done({ fail: err })
        } else {
          context.done(null, { status: account.attrs.status.S })
        }
      })
    } else {
      context.done({ fail: 'not exists or authorized' })
    }
  })
}
module.exports.run = validate
