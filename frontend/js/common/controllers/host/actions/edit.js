var Backbone = require('backbone');

var FormView = require('../../../views/form');
var ModalView = require('../../../views/modal');

module.exports = function (App, controller, options) {
    var formView = new FormView({
        model: options.model,
        template: require('../views/templates/form.hbs')
    });
    var modalView = new ModalView({
        model: new Backbone.Model({title: controller.content.modalTitles.edit})
    });
    App.modalRegion.show(modalView);
    modalView.bodyRegion.show(formView);
    modalView.on('save', formView.save, formView);
    controller.listenTo(formView, 'saved', function (host) {
        host.save(host.attributes, {
            success: function (__host__) {
                console.log('host ' + __host__.get('_id') + ' edited');
            }
        });
    });
};
