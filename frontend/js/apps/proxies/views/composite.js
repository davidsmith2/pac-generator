var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

var childView = require('./tableRow');

module.exports = Marionette.CompositeView.extend({
    template: _.template($('#proxies-template').html()),
    childView: childView,
    childViewContainer: 'table',
    triggers: {
        'click .js-create': 'create',
        'click .js-publish': 'publish'
    }
});
