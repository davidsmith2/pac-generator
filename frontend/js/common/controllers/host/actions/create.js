var Backbone = require('backbone');

var FormView = require('../../../views/form');
var ModalView = require('../../../views/modal');

module.exports = function (App, controller) {
    var formView = new FormView({
        model: new controller.relatedModel(),
        template: require('../views/templates/form.hbs'),
    });
    var modalView = new ModalView({
        model: new Backbone.Model({title: controller.content.modalTitles.create})
    });
    App.modalRegion.show(modalView);
    modalView.bodyRegion.show(formView);
    modalView.on('save', formView.save, formView);
    controller.listenTo(formView, 'saved', function (host) {
        this.collection.create(host.attributes, {
            success: function (__host__) {
                console.log('host ' + __host__.get('_id') + ' created');
            }
        });
    });
};
