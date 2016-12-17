var event = {
  "body_json": {
    "account_name": '111'
  }
}
var context = {
  done: function(a, b) {
    if(a == null) {
      console.log(b)
    } else {
      console.log('Error: ', a)
    }
  }
}
var run = require('./index').handler

// event.action = 'create'
// auth_code = run(event, context)
// console.log(auth_code)
auth_code = '95cbf527'
event.action = 'validate'
event.body_json = {
  'auth_code': auth_code
}
run(event, context)
