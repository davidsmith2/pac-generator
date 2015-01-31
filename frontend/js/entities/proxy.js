var Backbone = require('backbone');
require('backbone-relational');

var Exception = require('./exception');
var Exceptions = require('./exceptions');
var Rule = require('./rule');
var Rules = require('./rules');

module.exports = Backbone.RelationalModel.extend({
    urlRoot: '/api/proxies',
    idAttribute: '_id',
    defaults: {
        name: '',
        port: '',
        server: '',
        exceptions: [],
        rules: []
    },
    relations: [
        {
            type: Backbone.HasMany,
            key: 'exceptions',
            relatedModel: Exception,
            collectionType: Exceptions,
            reverseRelation: {
                key: 'proxy',
                includeInJSON: '_id'
            }
        },
        {
            type: Backbone.HasMany,
            key: 'rules',
            relatedModel: Rule,
            collectionType: Rules,
            reverseRelation: {
                key: 'proxy',
                includeInJSON: '_id'
            }
        }
    ],
    publish: function () {
        var url = this.url() + '/publish';
        var options = {
            url: url,
            type: 'get'
        };
        return (this.sync || Backbone.sync).call(this, null, this, options);
    }
});
