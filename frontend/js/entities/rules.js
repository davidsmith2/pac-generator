var Backbone = require('backbone');
var Rule = require('./rule');

module.exports = Backbone.Collection.extend({
    url: '/api/rules',
    model: Rule,
    comparator: 'host'
});
