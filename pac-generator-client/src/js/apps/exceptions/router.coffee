Marionette = require 'marionette'

module.exports = (App) =>
    class ExceptionRouter extends Marionette.AppRouter
        appRoutes: {}
        controller: require('./controller')(App).index()
    return new ExceptionRouter
