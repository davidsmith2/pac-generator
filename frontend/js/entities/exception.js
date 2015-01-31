var Backbone = require('backbone');
require('backbone-relational');

module.exports = Backbone.RelationalModel.extend({
    urlRoot: '/api/exceptions',
    idAttribute: '_id',
    defaults: {
        host: ''
    }
});
