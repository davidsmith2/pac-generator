module.exports = (App) =>
    App.module 'RulesApp', (RulesApp, App, Backbone, Marionette, $, _) =>
        RulesApp.startWithParent = false
        RulesApp.on 'start', () =>
            require('./router')(App)
    return App.RulesApp
