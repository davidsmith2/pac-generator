Backbone = require 'backbone'
FormView = require '../../../views/form'
ModalView = require '../../../views/modal'

module.exports = (App, controller, options) =>
    formView = new FormView
        model: options.model
        template: require '../views/templates/form.hbs'
    modalView = new ModalView
        model: new Backbone.Model title: controller.content.modalTitles.edit
    App.modalRegion.show modalView
    modalView.bodyRegion.show formView
    modalView.on 'save', formView.save, formView
    controller.listenTo formView, 'saved', (host) =>
        host.save host.attributes, 
            success: (__host__) =>
                hostName = __host__.get 'host'
                options =
                    message: hostName + ' host edited. Please publish PAC files.'
                App.trigger 'host:updated', options
