Backbone = require 'backbone'
FormView = require '../../../common/views/form'
ModalView = require '../../../common/views/modal'

module.exports = (App, controller, options) =>
    formView = new FormView
        model: options.model
        template: require '../views/templates/form.hbs'
    modalView = new ModalView
        model: new Backbone.Model title: 'Edit proxy'
    App.modalRegion.show modalView
    modalView.bodyRegion.show formView
    modalView.on 'save', formView.save, formView
    controller.listenTo formView, 'saved', (proxy) =>
        proxy.save proxy.attributes, 
            success: (__proxy__) =>
                proxyName = __proxy__.get 'name'
                opts =
                    options:
                        message: proxyName + ' proxy edited. Please publish PAC file.'
                controller.notify opts