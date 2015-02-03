var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');
require('bootstrap-growl');

module.exports =  Backbone.View.extend({
    defaults: {
        options: {},
        settings: {
            template: require('./templates/growl.hbs')()
        }
    },
    initialize: function (opts) {
        this.options = _.extend(this.defaults.options, opts.options);
        this.settings = _.extend(this.defaults.settings, opts.settings);
        this.render();
    },
    render: function () {
        $.growl(this.options, this.settings);
    }
});
