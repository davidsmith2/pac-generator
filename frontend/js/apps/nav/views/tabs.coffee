Backbone = require 'backbone'
Marionette = require 'marionette'
$ = require 'jquery'
_ = require 'underscore'
require 'bootstrap'

class TabsView extends Marionette.LayoutView
    template: require './templates/tabs.hbs'
    className: 'row'
    regions:
        proxiesRegion:      '#proxies-region'
        rulesRegion:        '#rules-region'
        exceptionsRegion:   '#exceptions-region'
    events:
        'click [href=#proxies-region]':     'change',
        'click [href=#rules-region]':       'change',
        'click [href=#exceptions-region]':  'change'
    change: (e) =>
        id = $(e.target)
            .attr 'href'
            .slice 1
        this.trigger 'change', id

module.exports = new TabsView;

