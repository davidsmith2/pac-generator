module.exports = (App) =>
    App.module 'ProxiesApp', (ProxiesApp, App, Backbone, Marionette, $, _) =>
        ProxiesApp.startWithParent = false
        ProxiesApp.on 'start', () =>
            require('./router')(App)
    return App.ProxiesApp
