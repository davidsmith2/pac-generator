var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

var ProxyView = require('./proxy');

module.exports = Marionette.CompositeView.extend({
    template: _.template($('#proxies-template').html()),
    childView: ProxyView,
    childViewContainer: 'table',
    triggers: {
        'click .js-create': 'create',
        'click .js-publish': 'publish'
    }
});
