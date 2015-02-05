Marionette = require 'marionette'
tabsView = require './views/tabs'

module.exports = (App) =>
    ProxiesApp = require('../proxies/app')(App)
    RulesApp = require('../rules/app')(App)
    ExceptionsApp = require('../exceptions/app')(App)
    class NavController extends Marionette.Controller
        show: () =>
            ProxiesApp.start()
            tabsView.on 'change', (id) =>
                if id is 'proxies-region'
                    RulesApp.stop();
                    ExceptionsApp.stop();
                    ProxiesApp.start();
                if id is 'rules-region'
                    ProxiesApp.stop();
                    ExceptionsApp.stop();
                    RulesApp.start();
                if id is 'exceptions-region'
                    ProxiesApp.stop();
                    RulesApp.stop();
                    ExceptionsApp.start();
            App.NavApp.on 'tab:change', (region, view) =>
                tabsView[region].show view
            App.navRegion.show tabsView
    return new NavController
