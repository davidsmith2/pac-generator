Backbone = require 'backbone'
_ = require 'underscore'
require 'backbone-relational'

class Proxy extends Backbone.Model
    urlRoot: '/api/users/' + window.user.uuid + '/proxies'
    idAttribute: '_id'
    defaults:
        name: ''
        port: ''
        server: ''
        href: ''
    setHref: (id) =>
        this.set 'href', window.location.protocol + '//' + window.location.host + '/pac/' + window.user.uuid + '/' + this.id + '/proxy.pac';
    publish: (opts) =>
        this.__sync__ opts, '/?action=publish'
    __sync__: (opts, route) =>
        url = this.url() + route;
        options =
            url: url
            type: 'get'
        _.extend options, opts
        return (this.sync || Backbone.sync).call this, null, this, options

module.exports = Proxy