var event = {
  body_json: {
    fb_uid: '1234'
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
auth_code = 'e456d950'
event.action = 'validate'
event.body_json = {
  'fb_uid': '1234',
  'auth_code': auth_code
}
run(event, context)
