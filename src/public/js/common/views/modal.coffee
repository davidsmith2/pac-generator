Marionette = require 'marionette'
require 'bootstrap'

class ModalView extends Marionette.LayoutView
    template: require './templates/modal.hbs'
    className: 'modal'
    regions:
        headerRegion: '.modal-header'
        bodyRegion: '.modal-body'
        footerRegion: '.modal-footer'
    events:
        'click .btn-primary': 'save'
    initialize: () =>
        @.$el.modal()
    onRender: () =>
        @.$el.modal 'show'
    save: () =>
        @.$el.modal 'hide'
        @.trigger 'save'

module.exports = ModalView