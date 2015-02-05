module.exports = (App) =>
    App.module 'ExceptionsApp', (ExceptionsApp, App, Backbone, Marionette, $, _) =>
        ExceptionsApp.startWithParent = false
        ExceptionsApp.on 'start', () =>
            require('./router')(App)
    return App.ExceptionsApp;
