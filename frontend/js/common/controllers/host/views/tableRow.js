var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template: require('./templates/tableRow.hbs'),
    tagName: 'tr',
    triggers: {
        'click .js-edit': 'edit',
        'click .js-delete': 'delete'
    },
    modelEvents: {
        'change:host': 'hostChanged'
    },
    hostChanged: function () {
        this.render();
    }
});
