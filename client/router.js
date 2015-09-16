var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var EndpointStatus = require('./pages/endpoint-status');
var InfoPage = require('./pages/info');


module.exports = Router.extend({
    routes: {
        '': 'home',
        'endpoints': 'endpointStatus',
        'info': 'info',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new HomePage({
            collection: app.endpoints
        }));
    },

    endpointStatus: function () {
        app.trigger('page', new EndpointStatus({
            collection: app.endpoints
        }));
    },

    info: function () {
        app.trigger('page', new InfoPage({
            model: app.me
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
