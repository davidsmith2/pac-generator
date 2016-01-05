Backbone = require 'backbone'
_ = require 'underscore'
require 'backbone-relational'

class Proxy extends Backbone.RelationalModel
    urlRoot: '/api/proxies'
    idAttribute: '_id'
    defaults:
        name: ''
        port: ''
        server: ''
        _creator: window.user.id
    initialize: () =>
        this.updateComputedProperties()
    updateComputedProperties: () =>
        href = location.protocol + '//' + location.host + '/pac/' + this.get('name').toLowerCase() + '/proxy.pac'
        this.set('href', href)
    publish: (opts) =>
        this.__sync__ opts, '/?action=publish'
    copy: (opts) =>
        this.__sync__ opts, '/?action=copy&href=' + this.get('href')
    __sync__: (opts, route) =>
        url = this.url() + route;
        options =
            url: url
            type: 'get'
        _.extend options, opts
        return (this.sync || Backbone.sync).call this, null, this, options

module.exports = Proxy