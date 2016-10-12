Marionette = require 'marionette'

module.exports = (App) =>
    class ProxyRouter extends Marionette.AppRouter
        appRoutes: {}
        controller: require('./controller')(App).index()
    return new ProxyRouter
