Backbone = require 'backbone'
FormView = require '../../../common/views/form'
ModalView = require '../../../common/views/modal'

module.exports = (App, controller, options) =>
    resourceType = options.model.get 'resourceType'
    formView = new FormView
        model: new options.view.relatedModel
        template: options.view.relatedTemplate
    modalView = new ModalView
        model: new Backbone.Model title: 'Create ' + resourceType
    App.modalRegion.show modalView
    modalView.bodyRegion.show formView
    modalView.on 'save', formView.save, formView
    controller.listenTo formView, 'saved', (resource) =>
        controller.collections.current.create resource.attributes, 
            success: (__resource__) =>
                resourceId = __resource__.get options.model.get 'resourceId'
                proxyMessage = resourceId +  ' ' + resourceType + ' created. Please publish PAC file.'
                hostMessage = resourceId +  ' ' + resourceType + ' created. Please publish PAC files.'
                opts =
                    options: {}
                if resourceType == 'proxy'
                    opts.options.message = proxyMessage
                    controller.notify opts
                else
                    opts.options.message = hostMessage
                    App.trigger 'host:updated', opts
