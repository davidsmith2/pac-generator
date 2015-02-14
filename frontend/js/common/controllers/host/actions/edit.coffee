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
                console.log 'host ' + __host__.get('_id') + ' edited'
                App.trigger 'proxies:updated'
