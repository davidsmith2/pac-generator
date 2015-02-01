var Backbone = require('backbone');

var ModalView = require('../../../views/modal');
var FormView = require('../views/form');

module.exports = function (App, controller) {
    var host = new controller.relatedModel();
    var formView = new FormView({model: host});
    var modalView = new ModalView({model: new Backbone.Model({title: controller.content.modalTitles.create})});
    App.modalRegion.show(modalView);
    modalView.bodyRegion.show(formView);
    controller.listenTo(modalView, 'save', function () {
        host.set('host', formView.$el.find('[name=host]').val());
        controller.collection.create(host.attributes, {
            success: function (__host__) {
                console.log('host ' + __host__.get('_id') + ' created');
            }
        });
    });
};
