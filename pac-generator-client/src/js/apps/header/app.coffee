module.exports = (App) =>
    App.module 'HeaderApp', (HeaderApp, App, Backbone, Marionette, $, _) =>
        HeaderApp.on 'start', () =>
            controller = require('./controller')(App)
            controller.show()
    return App.HeaderApp
