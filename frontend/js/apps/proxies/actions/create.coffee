Backbone = require 'backbone'
FormView = require '../../../common/views/form'
ModalView = require '../../../common/views/modal'
Proxy = require '../../../entities/proxy'

module.exports = (App, controller) =>
    formView = new FormView
        model: new Proxy
        template: require('../views/templates/form.hbs')
    modalView = new ModalView
        model: new Backbone.Model title: 'Create proxy'
    App.modalRegion.show modalView
    modalView.bodyRegion.show formView
    modalView.on 'save', formView.save, formView
    controller.listenTo formView, 'saved', (proxy) =>
        controller.collection.create proxy.attributes, 
            success: (__proxy__) =>
                console.log 'proxy ' + __proxy__.get('_id') + ' created'
                