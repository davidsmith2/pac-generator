Marionette = require('marionette');

module.exports = (App) =>
    class RuleRouter extends Marionette.AppRouter
        appRoutes: {}
        controller: require('./controller')(App).index()
    return new RuleRouter
