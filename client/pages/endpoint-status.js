var PageView = require('./base');
var templates = require('../templates');
var EndpointView = require('../views/endpoint');


module.exports = PageView.extend({
    pageTitle: 'endpoint status',
    template: templates.pages.endpointStatus,
    events: {
        'click [data-hook~=fetch]': 'fetchCollection'
    },
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, EndpointView, this.queryByHook('endpoint-list'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    }
});
