var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');
require('bootstrap');

module.exports =  Marionette.LayoutView.extend({
    template: require('./templates/alert.hbs'),
    className: 'alert',
    regions: {
        contentRegion: '.alert-content-region'
    }
});
