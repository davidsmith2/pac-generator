Marionette = require 'marionette'

TabsView = require './views/tabs'

controllerOptions =
	initialize: () ->
		this.tabsView = new TabsView()
	proxies: (a,b,c) ->
		this.tabsView.trigger 'changed', 'proxies'
	rules: () ->
		this.tabsView.trigger 'changed', 'rules'
	exceptions: () ->
		this.tabsView.trigger 'changed', 'exceptions'

Controller = Marionette.Object.extend controllerOptions

routerOptions =
	controller: new Controller controllerOptions
	appRoutes:
		'proxies/': 	'proxies'
		'rules/': 		'rules'
		'exceptions/': 	'exceptions'
	initialize: (options) ->
		options.navController.show this.controller.tabsView

Router = Marionette.AppRouter.extend routerOptions

module.exports = Router;