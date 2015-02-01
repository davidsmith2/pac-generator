var Marionette = require('marionette');

var tabsView = require('./views/tabs');

module.exports = function (App) {
    var ProxiesApp = require('../proxies/app')(App);
    var RulesApp = require('../rules/app')(App);
    var ExceptionsApp = require('../exceptions/app')(App);
    var Controller = Marionette.Controller.extend({
        show: function () {
            ProxiesApp.start();
            tabsView.on('change', function (id) {
                if (id === 'proxies-region') {
                    RulesApp.stop();
                    ExceptionsApp.stop();
                    ProxiesApp.start();
                }
                if (id === 'rules-region') {
                    ProxiesApp.stop();
                    ExceptionsApp.stop();
                    RulesApp.start();
                }
                if (id === 'exceptions-region') {
                    ProxiesApp.stop();
                    RulesApp.stop();
                    ExceptionsApp.start();
                }
            });
            App.NavApp.on('tab:change', function (region, view) {
                tabsView[region].show(view);
            });
            App.navRegion.show(tabsView);
        }
    });
    return new Controller();
};
