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
    initialize: function () {
        this.updateComputedProperties();
    },
    updateComputedProperties: function () {
        var href = location.href + 'pac/' + this.get('name').toLowerCase() + '/proxy.pac';
        this.set('href', href);
    },
    publish: function (opts) {
        this.__sync__(opts, '/?action=publish');
    },
    copy: function (opts) {
        this.__sync__(opts, '/?action=copy&href=' + this.get('href'));
    },
    __sync__: function (opts, route) {
        var url = this.url() + route;
        var options = {
            url: url,
            type: 'get'
        };
        _.extend(options, opts);
        return (this.sync || Backbone.sync).call(this, null, this, options);
    }
});
