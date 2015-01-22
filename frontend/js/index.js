(function ($, _, Backbone, Marionette) {

    var Proxy = Backbone.RelationalModel.extend({
        idAttribute: '_id',
        defaults: {
            name: '',
            port: '',
            exceptions: [],
            rules: []
        },
        relations: [
            {
                type: Backbone.HasMany,
                key: 'exceptions',
                relatedModel: Exception
            },
            {
                type: Backbone.HasMany,
                key: 'rules',
                relatedModel: Rule
            }
        ]
    });

    var Proxies = Backbone.Collection.extend({
        url: '/api/proxies',
        model: Proxy,
        comparator: 'name'
    });

    var Exception = Backbone.RelationalModel.extend({
        urlRoot: '/api/exceptions',
        idAttribute: '_id',
        defaults: {
            host: ''
        }
    });

    var Exceptions = Backbone.Collection.extend({
        url: '/api/exceptions',
        model: Exception
    });

    var Rule = Backbone.RelationalModel.extend({
        idAttribute: '_id',
        defaults: {
            host: ''
        }
    });

    var Rules = Backbone.Collection.extend({
        url: '/api/rules',
        model: Rule
    });




    var ModalView = Marionette.LayoutView.extend({
        template: _.template($('#modal-template').html()),
        className: 'modal',
        regions: {
            headerRegion: '.modal-header',
            bodyRegion: '.modal-body',
            footerRegion: '.modal-footer'
        },
        events: {
            'click .btn-primary': 'save'
        },
        initialize: function () {
            this.$el.modal();
        },
        onRender: function () {
            this.$el.modal('show');
        },
        save: function () {
            this.$el.modal('hide');
            this.trigger('save');
        }
    });

    var ExceptionFormView = Marionette.ItemView.extend({
        template: _.template($('#exception-form-template').html()),
        tagName: 'form',
        className: 'form-horizontal',
        triggers: {
            'submit': 'submit'
        }
    });

    var ExceptionView = Marionette.ItemView.extend({
        template: _.template($('#exception-template').html()),
        tagName: 'tr',
        triggers: {
            'click .js-edit': 'edit',
            'click .js-destroy': 'destroy'
        },
        modelEvents: {
            'change:host': 'hostChanged'
        },
        hostChanged: function () {
            this.render();
        }
    });

    var ExceptionsView = Marionette.CompositeView.extend({
        template: _.template($('#exceptions-template').html()),
        childView: ExceptionView,
        childViewContainer: 'table',
        triggers: {
            'click .js-create': 'create'
        }
    });

    var ExceptionController = Marionette.Controller.extend({
        index: function () {
            var self = this;
            self.collection = new Exceptions();
            self.collection.fetch({
                success: function (exceptions) {
                    var exceptionsView = new ExceptionsView({
                        collection: exceptions
                    });
                    App.exceptionsRegion.show(exceptionsView);
                    self.listenTo(exceptionsView, 'create', self.create);
                    self.listenTo(exceptionsView, 'childview:edit', self.edit);
                    self.listenTo(exceptionsView, 'childview:destroy', self['destroy']);
                }
            });
        },
        create: function () {
            var self = this;
            var exception = new Exception();
            var exceptionFormView = new ExceptionFormView({
                model: exception
            });
            var modalView = new ModalView({
                model: new Backbone.Model({title: 'Create exception'})
            });
            App.modalRegion.show(modalView);
            modalView.bodyRegion.show(exceptionFormView);
            self.listenTo(modalView, 'save', function () {
                exception.set('host', exceptionFormView.$el.find('[name=host]').val());
                self.collection.create(exception.attributes, {
                    success: function (model) {
                        console.log('exception ' + model.get('_id') + ' saved');
                    }
                });
            });
        },
        edit: function (options) {
            var self = this;
            var exception = options.model;
            var exceptionFormView = new ExceptionFormView({
                model: exception
            });
            var modalView = new ModalView({
                model: new Backbone.Model({title: 'Edit exception'})
            });
            App.modalRegion.show(modalView);
            modalView.bodyRegion.show(exceptionFormView);
            self.listenTo(modalView, 'save', function () {
                exception.save({
                    host: exceptionFormView.$el.find('[name=host]').val()
                });
            });
        },
        destroy: function (options) {
            var id = options.model.get('_id');
            options.model.destroy({
                success: function (model) {
                    console.log('exception ' + id + ' destroyed');
                }
            });
        }
    });





    var RuleView = Marionette.ItemView.extend({
        template: _.template($('#rule-template').html()),
        tagName: 'tr'
    });

    var RulesView = Marionette.CompositeView.extend({
        template: _.template($('#rules-template').html()),
        childView: RuleView,
        childViewContainer: 'table'

    });

    var ProxyView = Marionette.ItemView.extend({
        template: _.template($('#proxy-template').html()),
        tagName: 'tr'
    });

    var ProxiesView = Marionette.CompositeView.extend({
        template: _.template($('#proxies-template').html()),
        childView: ProxyView,
        childViewContainer: 'table'
    });

    var App = new Marionette.Application();

    App.addRegions({
        proxiesRegion: '#proxies-region',
        exceptionsRegion: '#exceptions-region',
        rulesRegion: '#rules-region',
        modalRegion: '#modal-region'
    });

    App.addInitializer(function () {



        var exceptionController = new ExceptionController();
        exceptionController.index();



        var proxies = new Proxies();
        var rules = new Rules();
        proxies.fetch({
            success: function (proxies) {
                var proxiesView = new ProxiesView({
                    collection: proxies
                });
                App.proxiesRegion.show(proxiesView);
            }
        });
        rules.fetch({
            success: function (rules) {
                var rulesView = new RulesView({
                    collection: rules
                });
                App.rulesRegion.show(rulesView);
            }
        });
    });

    App.start();

    App.on('start', function () {
        Backbone.history.start();
    });

}(jQuery, _, Backbone, Marionette));
