Backbone = require 'backbone'
require 'backbone-relational'

class Host extends Backbone.RelationalModel
    idAttribute: '_id'
    defaults:
        host:   ''
        active: true

module.exports = Host