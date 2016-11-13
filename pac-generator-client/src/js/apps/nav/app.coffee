Backbone = require 'backbone'
Marionette = require 'marionette'
$ = require 'jquery'
_ = require 'underscore'

module.exports = (App) =>
    App.module 'NavApp', (NavApp, App, Backbone, Marionette, $, _) =>
        NavApp.on 'start', () =>
            controller = require('./controller')(App)
            controller.show()
    return App.NavApp
