module.exports = (App) =>
    App.module 'PublishApp', (PublishApp, App, Backbone, Marionette, $, _) =>
        PublishApp.on 'start', () =>
            controller = require('./controller')(App)
            controller.show()
    return App.PublishApp
