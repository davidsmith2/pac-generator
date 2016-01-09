module.exports = (App) =>
    App.module 'ControlsApp', (ControlsApp, App, Backbone, Marionette, $, _) =>
        ControlsApp.startWithParent = false
        ControlsApp.on 'start', () =>
            Controller = require('./controller')(App)
            return new Controller
    return App.ControlsApp
