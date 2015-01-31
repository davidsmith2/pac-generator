var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

var HostView = require('./host');

module.exports = Marionette.CompositeView.extend({
    template: _.template($('.hosts-template').html()),
    childView: HostView,
    childViewContainer: 'table',
    triggers: {
        'click .js-create': 'create'
    }
});
