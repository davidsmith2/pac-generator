Backbone = require('backbone');
require('backbone-relational');

class Rule extends Backbone.RelationalModel
    urlRoot: '/api/rules'
    idAttribute: '_id'
    defaults:
        host: ''

module.exports = Rule