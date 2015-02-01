var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');
require('bootstrap');

var TabsView = Marionette.LayoutView.extend({
    template: _.template($('#nav-template').html()),
    className: 'row',
    events: {
        'click [href=#proxies-region]': 'change',
        'click [href=#rules-region]': 'change',
        'click [href=#exceptions-region]': 'change'
    },
    change: function (e) {
        this.trigger('change', $(e.target).attr('href').slice(1));
    }
});

module.exports = new TabsView();
