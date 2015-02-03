var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');
require('bootstrap');

var childView = require('./tableRow');

module.exports = Marionette.CompositeView.extend({
    template: require('./templates/composite.hbs'),
    childView: childView,
    childViewContainer: 'table',
    triggers: {
        'click .js-create': 'create',
        'click .js-publish': 'publish'
    },
    onRender: function () {
        this.$('[data-toggle=tooltip]').tooltip();
    }
});
