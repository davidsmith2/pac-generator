Router = require './router'

module.exports = (App) =>
	App.module 'ExceptionsApp', (ExceptionsApp, App, Backbone, Marionette, $, _) =>
		ExceptionsApp.startWithParent = false
		ExceptionsApp.on 'start', () =>
			@.router = Router App
			@.controller = @.router.controller
			@.controller.index()
	return App.ExceptionsApp
