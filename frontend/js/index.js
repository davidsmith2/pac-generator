(function ($, _, Backbone, Marionette) {

    var Exception = Backbone.RelationalModel.extend({
        defaults: {
            host: ''
        }
    });

    var Exceptions = Backbone.Collection.extend({
        url: '/api/exceptions',
        model: Exception
    });

    var Rule = Backbone.RelationalModel.extend({
        defaults: {
            host: ''
        }
    });

    var Rules = Backbone.Collection.extend({
        url: '/api/rules',
        model: Rule
    });

    var Proxy = Backbone.RelationalModel.extend({
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
                relatedModel: Exception,
                reverseRelation: {
                    type: Backbone.HasOne,
                    key: 'proxy',
                    includeInJSON: '_id'
                }
            },
            {
                type: Backbone.HasMany,
                key: 'rules',
                relatedModel: Rule,
                reverseRelation: {
                    type: Backbone.HasOne,
                    key: 'proxy',
                    includeInJSON: '_id'
                }
            }
        ]
    });

    var Proxies = Backbone.Collection.extend({
        url: '/api/proxies',
        model: Proxy,
        comparator: 'name'
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

    var App = new Marionette.Application();

    App.addRegions({
        proxiesRegion: '#proxies-region'
    });

    App.addInitializer(function () {
        var proxies = new Proxies();
        proxies.fetch({
            success: function (proxies) {
                var proxiesView = new ProxiesView({
                    collection: proxies
                });
                App.proxiesRegion.show(proxiesView);
            }
        });
    });

    App.start();

}(jQuery, _, Backbone, Marionette));
