Backbone = require 'backbone'
Backbone.$ = require 'jquery'
Marionette = require 'marionette'

App = new Marionette.Application

App.addRegions
    headerRegion:   '#header-region'
    navRegion:      '#nav-region'
    footerRegion:   '#footer-region'
    modalRegion:    '#modal-region'

App.addInitializer () =>
    require('./apps/header/app')(App)
    require('./apps/nav/app')(App)

App.on 'start', () =>
    Backbone.history.start()

App.start()