Backbone = require 'backbone'
Marionette = require 'marionette'

ControlsApp = require '../controls/app'
ExceptionsApp = require '../exceptions/app'
ProxiesApp = require '../proxies/app'
RulesApp = require '../rules/app'

module.exports = (App) =>
    class NavController extends Marionette.Controller
        subApps:
            controlsApp: ControlsApp(App)
            exceptionsApp: ExceptionsApp(App)
            proxiesApp: ProxiesApp(App)
            rulesApp: RulesApp(App)
        initialize: () ->
            this.subApps.controlsApp.start()
            this.subApps.proxiesApp.start()
        show: (tabsView) ->
            this.tabsView = tabsView
            tabsView.on 'change', this.manual, this
            tabsView.on 'changed', this.auto, this
            App.navRegion.show tabsView
        manual: (id) ->
            Backbone.history.navigate id + '/', {trigger: true}
        auto: (id) ->
            if id is 'proxies'
                this.subApps.rulesApp.stop()
                this.subApps.exceptionsApp.stop()
            if id is 'rules'
                this.subApps.proxiesApp.stop()
                this.subApps.exceptionsApp.stop()
            if id is 'exceptions'
                this.subApps.proxiesApp.stop()
                this.subApps.rulesApp.stop()
            this.subApps[id + 'App'].start()

    return new NavController
