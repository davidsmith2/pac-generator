Marionette = require 'marionette'

Controller = require './controller'

module.exports = (App) =>
    class ExceptionRouter extends Marionette.AppRouter
        appRoutes: {}
        controller: Controller App
    return new ExceptionRouter
