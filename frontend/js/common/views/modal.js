var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');
require('bootstrap');

module.exports = Marionette.LayoutView.extend({
    template: require('./templates/modal.hbs'),
    className: 'modal',
    regions: {
        headerRegion: '.modal-header',
        bodyRegion: '.modal-body',
        footerRegion: '.modal-footer'
    },
    events: {
        'click .btn-primary': 'save'
    },
    initialize: function () {
        this.$el.modal();
    },
    onRender: function () {
        this.$el.modal('show');
    },
    save: function () {
        this.$el.modal('hide');
        this.trigger('save');
    }
});
