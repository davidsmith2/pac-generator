Backbone = require 'backbone'
Marionette = require 'marionette'
Proxies = require '../../entities/proxies'

ResourceLayoutView = require '../../common/views/resourceLayout'

module.exports = (App) =>
    class ProxyController extends Marionette.Controller
        initialize: () =>
            @.collection = new Proxies
            @.layout = new ResourceLayoutView
        index: () =>
            return require('./actions/index')(App, @)
        edit: (view) =>
            return require('./actions/edit')(App, @, view)
        'delete': (view) =>
            return require('./actions/delete')(App, @, view)
        publish: (view) =>
            return require('./actions/publish')(App, @, view)
        notify: (opts) =>
            return require('../../common/actions/notify')(opts)
    return new ProxyController
