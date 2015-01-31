var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

module.exports = Marionette.ItemView.extend({
    template: _.template($('#proxy-template').html()),
    tagName: 'tr',
    triggers: {
        'click .js-publish': 'publish',
        'click .js-copy': 'copy',
        'click .js-edit': 'edit',
        'click .js-delete': 'delete'
    },
    modelEvents: {
        'change': 'changed'
    },
    changed: function () {
        this.render();
    }
});
