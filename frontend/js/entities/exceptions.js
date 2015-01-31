var Backbone = require('backbone');
var Exception = require('./exception');

module.exports = Backbone.Collection.extend({
    url: '/api/exceptions',
    model: Exception,
    comparator: 'host'
});
