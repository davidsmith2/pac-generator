var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');
require('bootstrap');

module.exports = Marionette.ItemView.extend({
    template: require('./templates/tableRow.hbs'),
    tagName: 'tr',
    triggers: {
        'click .js-delete': 'delete',
        'click .js-edit': 'edit',
        'click .js-publish': 'publish'
    },
    events: {
        'click .js-copy': 'copy'
    },
    copy: function (e) {
        var $el = $(e.target), self = this;
        e.preventDefault();
        $el.tooltip().on('shown.bs.tooltip', function () {
            self.trigger('copy', {model: self.model});
        });
    },
    modelEvents: {
        'change': 'changed'
    },
    changed: function () {
        this.render();
    }
});
