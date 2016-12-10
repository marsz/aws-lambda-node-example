var event = {
  body_json: {
    fb_uid: '1234'
  }
}
var context = {
  done: function(a, b) {
    console.log(b)
  }
}
var run = require('./index').handler
event.action = 'create'

var auth_code = run(event, context)
event.action = 'validate'
event.body_json = {
  'fb_uid': '1234',
  'auth_code': auth_code
}
run(event, context)
