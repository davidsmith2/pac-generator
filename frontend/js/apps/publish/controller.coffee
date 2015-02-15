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
            @.collection = collection
        onHostUpdated: (opts) =>
            publishView.enable()
            @.notify(opts)
        publish: () =>
            options = {collection: @.collection}
            return require('./actions/publish')(App, @, options)
        notify: (opts) =>
            return require('../../common/actions/notify')(opts)

    return new PublishController
