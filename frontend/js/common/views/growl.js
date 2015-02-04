var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');
require('bootstrap');
require('bootstrap-growl');

module.exports = Marionette.ItemView.extend({
    template: false,
    defaults: {
        options: {},
        settings: {
            offset: 0,
            placement: {
                align: 'center'
            },
            template: require('./templates/growl.hbs')()
        }
    },
    initialize: function (opts) {
        this.options = _.extend(this.defaults.options, opts.options);
        this.settings = _.extend(this.defaults.settings, opts.settings);
        this.render();
    },
    onBeforeRender: function () {
        $.growl(this.options, this.settings);
    }
});
