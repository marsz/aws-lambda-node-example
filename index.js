module.exports.handler = function(event, context) {
  switch(event.action) {
    case 'create':
      var action = require('./actions/create')
      return action.run(context, event.body_json)
    case 'validate':
      var action = require('./actions/validate')
      return action.run(context, event.body_json)
  }
}
