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
        'click [data-toggle=tab]': 'change'
    initialize: () ->
        this.on 'changed', this.onChanged, this
    change: (e) ->
        id = $(e.target).attr('href').slice(1).split('-')[0]
        this.trigger 'change', id
    onChanged: (id) ->
        this.$('[href=#' + id + '-region]').trigger 'click'

module.exports = TabsView