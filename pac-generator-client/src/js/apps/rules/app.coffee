Router = require './router'

module.exports = (App) =>
	App.module 'RulesApp', (RulesApp, App, Backbone, Marionette, $, _) =>
		RulesApp.startWithParent = false
		RulesApp.on 'start', () =>
			@.router = Router App
			@.controller = @.router.controller
			@.controller.index()
	return App.RulesApp
