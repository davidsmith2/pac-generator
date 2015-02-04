var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');
require('bootstrap');
require('bootstrap-growl');

module.exports = Backbone.View.extend({
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
        var options = _.extend(this.defaults.options, opts.options);
        var settings = _.extend(this.defaults.settings, opts.settings);
        this.render(options, settings);
    },
    render: function (options, settings) {
        $.growl(options, settings);
    }
});
