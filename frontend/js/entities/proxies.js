var Backbone = require('backbone');
var _ = require('underscore');

var Proxy = require('./proxy');

module.exports = Backbone.Collection.extend({
    url: '/api/proxies',
    model: Proxy,
    comparator: 'name',
    publish: function (opts) {
        var url = this.url + '/?action=publish';
        var options = {
            url: url,
            type: 'get'
        };
        _.extend(options, opts);
        return (this.sync || Backbone.sync).call(this, null, this, options);
    }
});
