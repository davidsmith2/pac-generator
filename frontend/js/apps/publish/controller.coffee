Marionette = require 'marionette'
publishView = require './views/publish'

module.exports = (App) =>
    class PublishController extends Marionette.Controller
        initialize: () =>
            App.on 'proxies:acquired', @.onProxiesAcquired, @
            App.on 'proxies:updated', @.onProxiesUpdated, @
            @.listenTo publishView, 'publish', @.publish
        show: () =>
            App.publishRegion.show publishView
        onProxiesAcquired: (collection) =>
            this.collection = collection
        onProxiesUpdated: () =>
            publishView.enable()
        publish: () =>
            options = {collection: this.collection}
            return require('./actions/publish')(App, this, options)

    return new PublishController
