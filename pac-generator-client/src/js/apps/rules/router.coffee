Marionette = require 'marionette'

Controller = require './controller'

module.exports = (App) =>
    class RuleRouter extends Marionette.AppRouter
        appRoutes: {}
        controller: Controller App
    return new RuleRouter
