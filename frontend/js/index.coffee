Backbone = require 'backbone'
Backbone.$ = require 'jquery'
Marionette = require 'marionette'

App = new Marionette.Application

App.addRegions
    alertRegion:    '#alert-region'
    navRegion:      '#nav-region'
    modalRegion:    '#modal-region'

App.addInitializer () =>
    require('./apps/nav/app')(App)

App.start()

App.on 'start', () =>
    Backbone.history.start();
