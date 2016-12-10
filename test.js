var event = {
  params: {
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
run(event, context)
