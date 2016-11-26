Backbone = require 'backbone'
Exception = require './exception'

class Exceptions extends Backbone.Collection
    url: '/api/users/' + window.user.uuid + '/exceptions'
    model: Exception
    comparator: 'host'

module.exports = Exceptions