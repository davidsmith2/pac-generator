var Backbone = require('backbone');
var Proxy = require('./proxy');

module.exports = Backbone.Collection.extend({
    url: '/api/proxies',
    model: Proxy,
    comparator: 'name',
    publish: function () {
        this.each(function (proxy) {
            proxy.publish();
        });
    }
});
