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




    var ExceptionRouter = Marionette.AppRouter.extend({
        appRoutes: {
            '!/exceptions/create': 'create',
            '!/exceptions/:exception/destroy': 'destroy'
        }
    });

    var ExceptionFormView = Marionette.ItemView.extend({
        template: _.template($('#exception-form-template').html()),
        tagName: 'form',
        triggers: {
            'submit': 'submit'
        }
    });

    var ExceptionView = Marionette.ItemView.extend({
        template: _.template($('#exception-template').html()),
        tagName: 'tr',
        triggers: {
            'click .js-destroy': 'destroy'
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
            App.modalRegion.show(exceptionFormView);
            self.listenTo(exceptionFormView, 'submit', function (options) {
                options.model.set('host', exceptionFormView.$el.find('[name=host]').val());
                self.collection.create(options.model.attributes, {
                    success: function (model) {
                        console.log('exception ' + model.get('_id') + ' saved');
                    }
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





    var ProxyView = Marionette.ItemView.extend({
        template: _.template($('#proxy-template').html()),
        tagName: 'tr'
    });

    var ProxiesView = Marionette.CollectionView.extend({
        tagName: 'table',
        className: 'table table-bordered table-striped',
        childView: ProxyView
    });

    var RuleView = Marionette.ItemView.extend({
        template: _.template($('#rule-template').html()),
        tagName: 'tr'
    });

    var RulesView = Marionette.CollectionView.extend({
        tagName: 'table',
        className: 'table table-bordered table-striped',
        childView: RuleView
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

    App.on('exception:create', function () {
        Backbone.history.navigate('!/exceptions/create');
    });

    App.on('exception:destroy', function (id) {
        Backbone.history.navigate('!/exceptions/' + id + '/destroy');
    });

}(jQuery, _, Backbone, Marionette));
