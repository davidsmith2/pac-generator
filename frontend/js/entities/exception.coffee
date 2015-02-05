Backbone = require 'backbone'
require 'backbone-relational'

class Exception extends Backbone.RelationalModel
    urlRoot: '/api/exceptions'
    idAttribute: '_id'
    defaults:
        host: ''

module.exports = Exception