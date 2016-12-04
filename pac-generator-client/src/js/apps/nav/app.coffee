Backbone = require 'backbone'
Marionette = require 'marionette'
$ = require 'jquery'
_ = require 'underscore'

Router = require './router'
navController = require './controller'

module.exports = (App) =>
    App.module 'NavApp', (NavApp, App, Backbone, Marionette, $, _) ->
        NavApp.on 'start', () =>
        	routerOptions = 
        		navController: navController App
        	this.router = new Router routerOptions
        	this.view = this.router.controller.tabsView
    return App.NavApp
