var Backbone = require('backbone');
require('backbone-relational');

module.exports = Backbone.RelationalModel.extend({
    urlRoot: '/api/rules',
    idAttribute: '_id',
    defaults: {
        host: ''
    }
});
