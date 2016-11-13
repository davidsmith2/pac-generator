Backbone = require 'backbone'
Rule = require './rule'

class Rules extends Backbone.Collection
    url: '/api/rules'
    model: Rule
    comparator: 'host'

module.exports = Rules