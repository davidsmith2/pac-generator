Backbone = require 'backbone'
Exception = require './exception'

class Exceptions extends Backbone.Collection
    url: '/api/exceptions'
    model: Exception
    comparator: 'host'

module.exports = Exceptions;