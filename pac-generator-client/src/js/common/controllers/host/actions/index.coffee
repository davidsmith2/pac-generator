CompositeView = require '../views/composite'

module.exports = (App, controller) =>
    controller.collection.fetch
        success: (collection) =>
            compositeView = new CompositeView 
                collection: collection
            controller.layout.on 'show', () =>
                compositeView.on 'childview:edit', controller.edit, controller
                compositeView.on 'childview:delete', controller['delete'], controller
                compositeView.on 'childview:toggle', controller.toggle, controller
                controller.layout.bodyRegion.show compositeView
                App.NavApp.trigger 'panel:ready', controller.regionName, controller.layout.headerRegion
            App.NavApp.trigger 'tab:change', controller.regionName, controller.layout
            App.trigger 'hosts:acquired', collection

