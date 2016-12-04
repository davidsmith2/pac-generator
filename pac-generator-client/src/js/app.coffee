Backbone = require 'backbone'
$ = require 'jquery'

Backbone.$ = $;
window.jQuery = $;

Marionette = require 'marionette'

App = new Marionette.Application

HeaderApp = require('./apps/header/app')(App)
NavApp = require('./apps/nav/app')(App)

App.addRegions
    headerRegion:   '#header-region'
    navRegion:      '#nav-region'
    footerRegion:   '#footer-region'
    modalRegion:    '#modal-region'

App.on 'start', () =>
    Backbone.history.start
    	pushState: true,
    	root: '/dashboard'

App.start()