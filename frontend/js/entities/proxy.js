var Backbone = require('backbone');
var _ = require('underscore');
require('backbone-relational');

var Exception = require('./exception');
var Exceptions = require('./exceptions');
var Rule = require('./rule');
var Rules = require('./rules');

module.exports = Backbone.RelationalModel.extend({
    urlRoot: '/api/proxies',
    idAttribute: '_id',
    defaults: {
        name: '',
        port: '',
        server: ''
    },
    publish: function (opts) {
        var url = this.url() + '/publish';
        var options = {
            url: url,
            type: 'get'
        };
        _.extend(options, opts);
        return (this.sync || Backbone.sync).call(this, null, this, options);
    }
});
