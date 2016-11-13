Marionette = require 'marionette'
$ = require 'jquery'
require 'bootstrap'
Clipboard = require 'clipboard'

class TableRowView extends Marionette.ItemView
    template: require './templates/tableRow.hbs'
    tagName: 'tr'
    ui:
        copy:                   '.js-copy'
        'delete':               '.js-delete'
        edit:                   '.js-edit'
        publish:                '.js-publish'
    triggers:
        'click @ui.delete':     'delete'
        'click @ui.edit':       'edit'
        'click @ui.publish':    'publish'
    events:
        'click @ui.copy':       'copy'
    modelEvents:
        'change':               'changed'
    behaviors:
        PublishBehavior:
            behaviorClass: require '../../../common/behaviors/PublishBehavior'
            buttonSelector: '.js-publish'
    onRender: () =>
        @.clipboard = new Clipboard('.js-copy')
        @.$('.js-copy').tooltip()
    changed: () =>
        @.render()
        @.enablePublishing()
    copy: (e) =>
        e.preventDefault()
        @.clipboard.on 'success', (e) =>
            e.clearSelection()
            @.clipboard.destroy()
    enablePublishing: () =>
        @.trigger 'publish:enable'
    disablePublishing: () =>
        @.trigger 'publish:disable'

module.exports = TableRowView