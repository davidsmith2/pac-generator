Backbone = require 'backbone'
require 'backbone-relational'

class Host extends Backbone.RelationalModel
    idAttribute: '_id'
    defaults:
        _creator: window.user.id
        host:   ''
        active: true

module.exports = Host