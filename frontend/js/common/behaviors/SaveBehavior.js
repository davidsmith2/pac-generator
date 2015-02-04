var Marionette = require('marionette');
var $ = require('jquery');

module.exports = Marionette.Behavior.extend({
    defaults: {
        fieldSelector: ':input',
    },
    initialize: function () {
        this.listenTo(this.view, 'save', this.onSave);
    },
    onSave: function () {
        var self = this;
        self.$(self.options.fieldSelector).each(function () {
            var $el = $(this);
            self.view.model.set($el.attr('name'), $el.val());
        });
        self.view.trigger('saved', self.view.model);
    }
});
