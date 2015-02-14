Marionette = require 'marionette'
publishView = require './views/publish'

module.exports = (App) =>
    class PublishController extends Marionette.Controller
        initialize: () =>
            App.on 'proxies:acquired', @.onProxiesAcquired, @
            App.on 'host:updated', @.onHostUpdated, @
            @.listenTo publishView, 'publish', @.publish
        show: () =>
            App.publishRegion.show publishView
        onProxiesAcquired: (collection) =>
            this.collection = collection
        onHostUpdated: (options) =>
            publishView.enable()
            @.notify(options)
        publish: () =>
            options = {collection: this.collection}
            return require('./actions/publish')(App, this, options)
        notify: (options) =>
            return require('../../common/actions/notify')(options)

    return new PublishController
