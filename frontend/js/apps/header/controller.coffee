Backbone = require 'backbone'
Marionette = require 'marionette'

LayoutView = require './views/layout'

module.exports = (App) =>
    class HeaderController extends Marionette.Controller
        initialize: () =>
            @.headerRegion = App.headerRegion
            @.layoutView = new LayoutView
                model: new Backbone.Model
                    title: @.headerRegion.$el.data('title')
            @.listenTo @.layoutView, 'publish', @.publish
            App.on 'proxies:acquired', @.onProxiesAcquired, @
            App.on 'host:updated', @.onHostUpdated, @
        show: () =>
            @.headerRegion.show @.layoutView
        onProxiesAcquired: (collection) =>
            @.collection = collection
        onHostUpdated: (opts) =>
            @.layoutView.enablePublishing()
            @.notify(opts)
        publish: () =>
            options = {collection: @.collection}
            return require('./actions/publish')(App, @, options)
        notify: (opts) =>
            return require('../../common/actions/notify')(opts)

    return new HeaderController
