var Backbone = require('backbone');

var FormView = require('../../../common/views/form');
var ModalView = require('../../../common/views/modal');

module.exports = function (App, controller, options) {
    var formView = new FormView({
        model: options.model,
        template: require('../views/templates/form.hbs')
    });
    var modalView = new ModalView({
        model: new Backbone.Model({title: 'Edit proxy'})
    });
    App.modalRegion.show(modalView);
    modalView.bodyRegion.show(formView);
    modalView.on('save', formView.save, formView);
    controller.listenTo(formView, 'saved', function (proxy) {
        proxy.save(proxy.attributes, {
            success: function (__proxy__) {
                console.log('proxy ' + __proxy__.get('_id') + ' edited');
            }
        });
    });
};