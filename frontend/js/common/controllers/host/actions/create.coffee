Backbone = require 'backbone'
FormView = require '../../../views/form'
ModalView = require '../../../views/modal'

module.exports = (App, controller) =>
    formView = new FormView
        model: new controller.relatedModel
        template: require '../views/templates/form.hbs'
    modalView = new ModalView
        model: new Backbone.Model title: controller.content.modalTitles.create
    App.modalRegion.show modalView
    modalView.bodyRegion.show formView
    modalView.on 'save', formView.save, formView
    controller.listenTo formView, 'saved', (host) =>
        controller.collection.create host.attributes, 
            success: (__host__) =>
                hostName = __host__.get 'host'
                opts =
                    options:
                        message: hostName + ' host created. Please publish PAC files.'
                App.trigger 'host:updated', opts