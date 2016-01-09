Marionette = require 'marionette'

class ControlsView extends Marionette.ItemView
    template: require './templates/layout.hbs'
    ui:
        createBtn: '.js-create'
        publishBtn: '.js-publish'
    triggers:
        'click @ui.createBtn': 'create'
    events:
        'click @ui.publishBtn': 'publish'
    behaviors:
        PublishBehavior:
            behaviorClass: require '../../../common/behaviors/PublishBehavior'
            buttonSelector: '.js-publish'
    publish: (e) =>
        e.preventDefault()
        @.disablePublishing()
        @.trigger 'publish'
    enablePublishing: () =>
        @.trigger 'publish:enable'
    disablePublishing: (e) =>
        @.trigger 'publish:disable'

module.exports = ControlsView