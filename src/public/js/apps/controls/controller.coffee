Backbone = require 'backbone'
Marionette = require 'marionette'

LayoutView = require './views/layout'

ProxyModel = require '../../entities/proxy'
RuleModel = require '../../entities/rule'
ExceptionModel = require '../../entities/exception'

ProxyFormTemplate = require '../../common/views/templates/proxyForm.hbs'
HostFormTemplate = require '../../common/views/templates/hostForm.hbs'

module.exports = (App) =>
    class ControlsController extends Marionette.Controller
        collections:
            current: {}
            proxies: {}
        initialize: () =>
            App.NavApp.on 'panel:ready', @.show, @
            App.on 'proxies:acquired', @.onProxiesAcquired, @
            App.on 'hosts:acquired', @.onHostsAcquired, @
            App.on 'host:updated', @.onHostUpdated, @
        show: (panelId, region) =>
            @.layoutView = switch panelId
                when 'proxiesRegion' then @.createLayoutView({
                    modelAttrs:
                        title: 'Proxies'
                        resourceType: 'proxy'
                        resourceId: 'name'
                        allowsPublishing: false
                    relatedModel: ProxyModel
                    relatedTemplate: ProxyFormTemplate
                })
                when 'rulesRegion' then @.createLayoutView({
                    modelAttrs:
                        title: 'Rules'
                        resourceType: 'rule'
                        resourceId: 'host'
                        allowsPublishing: true
                    relatedModel: RuleModel
                    relatedTemplate: HostFormTemplate
                })
                when 'exceptionsRegion' then @.createLayoutView({
                    modelAttrs:
                        title: 'Exceptions'
                        resourceType: 'exception'
                        resourceId: 'host'
                        allowsPublishing: true
                    relatedModel: ExceptionModel
                    relatedTemplate: HostFormTemplate
                })
            @.layoutView.on 'create', @.create, @
            @.layoutView.on 'publish', @.publish, @
            region.show @.layoutView
        create: (options) =>
            return require('./actions/create')(App, @, options)
        publish: () =>
            return require('./actions/publish')(App, @, {collection: @.collections.proxies})
        notify: (opts) =>
            return require('../../common/actions/notify')(opts)
        createLayoutView: (options) =>
            layoutView = new LayoutView
                model: new Backbone.Model
                    title: options.modelAttrs.title
                    resourceType: options.modelAttrs.resourceType
                    resourceId: options.modelAttrs.resourceId
                    allowsPublishing: options.modelAttrs.allowsPublishing
            layoutView.relatedModel = options.relatedModel
            layoutView.relatedTemplate = options.relatedTemplate
            return layoutView
        onProxiesAcquired: (proxies) =>
            @.collections.current = proxies
            @.collections.proxies = proxies
        onHostsAcquired: (hosts) =>
            @.collections.current = hosts
        onHostUpdated: (opts) =>
            @.notify opts
            @.layoutView.enablePublishing()
    return ControlsController
