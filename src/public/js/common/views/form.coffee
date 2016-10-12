Marionette = require 'marionette'

class FormView extends Marionette.ItemView
    tagName: 'form'
    className: 'form-horizontal'
    behaviors:
        SaveBehavior:
            behaviorClass: require '../behaviors/SaveBehavior'
            fieldSelector: '.form-control'
    save: () =>
        @.trigger 'save'

module.exports = FormView