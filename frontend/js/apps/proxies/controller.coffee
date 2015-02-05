Marionette = require 'marionette'
Proxies = require '../../entities/proxies'

module.exports = (App) =>
    class ProxyController extends Marionette.Controller
        initialize: () =>
            this.collection = new Proxies
        copy: (options) =>
            return require('./actions/copy')(App, this, options)
        create: () =>
            return require('./actions/create')(App, this)
        'delete': (options) =>
            return require('./actions/delete')(App, this, options)
        edit: (options) =>
            return require('./actions/edit')(App, this, options)
        index: () =>
            return require('./actions/index')(App, this)
        publish: (options) =>
            return require('./actions/publish')(App, this, options)
        publishAll: (options) =>
            return require('./actions/publishAll')(App, this, options)
    return new ProxyController
