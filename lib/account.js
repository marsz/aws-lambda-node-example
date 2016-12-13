var Account = function(fb_uid) {
  this.initialize = function(fb_uid) {
    this.fb_uid = fb_uid
    this.db = require('./db')
  }
  this.initialize(fb_uid)

  this.table_name = 'accounts'
  this.errors = []
  this.has_error = function() {
    return this.errors.length > 0
  }
  this.exists = null
  this.attrs = {}
  this.is_authorized = function() {
    return this.attrs.status.S == 'authorized'
  }
  this.find = function(cb) {
    var query_params = {
      TableName: this.table_name,
      Select: 'ALL_ATTRIBUTES',
      KeyConditionExpression: '#fb_uid = :fb_uid',
      ExpressionAttributeNames: {
        '#fb_uid': 'fb_uid'
      },
      ExpressionAttributeValues: {
        ':fb_uid': { S: this.fb_uid }
      }
    }
    var self = this

    this.db.query(query_params, function(err, data) {
      if (err) {
        self.exists = false
        self.errors.push(err)
      } else {
        var item = data.Items[0]
        if(item) {
          self.attrs = item || {}
          self.exists = true
        } else {
          self.exists = false
        }
      }
      cb(self, err)
    })
  }

  this.validate = function(auth_code, cb) {
    if(this.attrs.auth_code['S'] == auth_code) {
      this.update({
        status: 'authorized'
      }, function(account, err) {
        cb(account, err)
      })
      return true
    }
    return false
  }

  this.update = function(params, cb) {
    var self = this
    Object.keys(params).forEach(function(key) {
      if(!self.attrs[key]) self.attrs[key] = {}
      self.attrs[key].S = params[key]
    })
    self.attrs.fb_uid = { S: this.fb_uid }
    var put_params = {
      TableName: this.table_name,
      Item: this.attrs
    }
    this.db.putItem(put_params, function(err, data) {
      if(err != null)
        self.errors.push(err)
      cb(self, err)
    })
  }

}
module.exports = Account
