Router = require './router'

module.exports = (App) =>
	App.module 'ProxiesApp', (ProxiesApp, App, Backbone, Marionette, $, _) =>
		ProxiesApp.startWithParent = false
		ProxiesApp.on 'start', () =>
			@.router = Router App
			@.controller = @.router.controller
			@.controller.index()
		return App.ProxiesApp