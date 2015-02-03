var Backbone = require('backbone');
var Marionette = require('marionette');
var $ = require('jquery');
var _ = require('underscore');
require('bootstrap');


var TabsView = Marionette.LayoutView.extend({
    template: require('./templates/tabs.hbs'),
    className: 'row',
    regions: {
        proxiesRegion: '#proxies-region',
        rulesRegion: '#rules-region',
        exceptionsRegion: '#exceptions-region'
    },
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
