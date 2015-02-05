Backbone = require 'backbone'
_ = require 'underscore'
Proxy = require './proxy'

class Proxies extends Backbone.Collection
    url: '/api/proxies'
    model: Proxy
    comparator: 'name'
    publish: (opts) =>
        url = this.url + '/?action=publish'
        options
            url: url
            type: 'get'
        _.extend options, opts
        return (this.sync or Backbone.sync).call this, null, this, options

module.exports = Proxies