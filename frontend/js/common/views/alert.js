var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');

module.exports =  Marionette.LayoutView.extend({
    template: _.template($('#alert-template').html()),
    className: 'alert',
    regions: {
        contentRegion: '.alert-content-region'
    }
});
