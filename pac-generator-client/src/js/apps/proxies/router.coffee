Marionette = require 'marionette'

Controller = require './controller';

module.exports = (App) =>
    class ProxyRouter extends Marionette.AppRouter
        appRoutes: {}
        controller: Controller App
    return new ProxyRouter
