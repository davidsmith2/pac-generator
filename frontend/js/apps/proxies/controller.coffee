Marionette = require 'marionette'
Proxies = require '../../entities/proxies'

module.exports = (App) =>
    class ProxyController extends Marionette.Controller
        initialize: () =>
            this.collection = new Proxies
        index: () =>
            return require('./actions/index')(App, this)
        create: () =>
            return require('./actions/create')(App, this)
        edit: (view) =>
            return require('./actions/edit')(App, this, view)
        'delete': (view) =>
            return require('./actions/delete')(App, this, view)
        publish: (view) =>
            return require('./actions/publish')(App, this, view)
        copy: (view) =>
            return require('./actions/copy')(App, this, view)
        notify: (opts) =>
            return require('../../common/actions/notify')(opts)
    return new ProxyController
