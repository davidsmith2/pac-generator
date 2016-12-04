CompositeView = require '../views/composite'

module.exports = (App, controller) =>
    controller.collection.fetch
        success: (proxies) =>
            compositeView = new CompositeView
                collection: proxies
            controller.layout.on 'show', () =>
                compositeView.on 'childview:copy', controller.copy, controller
                compositeView.on 'childview:delete', controller['delete'], controller
                compositeView.on 'childview:edit', controller.edit, controller
                compositeView.on 'childview:publish', controller.publish, controller
                controller.layout.bodyRegion.show compositeView
                App.NavApp.trigger 'panel:ready', 'proxiesRegion', controller.layout.headerRegion
            App.NavApp.view['proxiesRegion'].show controller.layout
            App.trigger 'proxies:acquired', proxies
