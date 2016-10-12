var _ = require('underscore');

var creatorSchema = require('./creatorSchema');

module.exports = _.extend({}, creatorSchema, {
    host: String,
    proxy: String,
    active: Boolean
});