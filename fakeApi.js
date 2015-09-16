var _ = require('lodash');
var http = require('http');

var endpoints = [
    {
        name: 'facet',
        url: 'http://uk-api.app.betfair/',
        code: 200
    },
    {
        name: 'capi',
        url: 'http://aus-content.au.app.betfair/',
        code: 200
    },
    {
        name: 'login',
        url: 'http://identitysso.pp1.au.betfair/',
        code: 200
    }
];

function get(name) {
    return _.findWhere(endpoints, {name: name});
}

exports.list = function (req, res) {
    res.send(endpoints);
};

exports.get = function (req, res) {
    var found = get(req.params.id);
    res.status(found ? 200 : 404);
    res.send(found);
};

function refreshEndpointStatus() {
    endpoints.forEach(function(endpoint) {
        console.log("endpoint: ", endpoint.url);
        http.get(endpoint.url, function(res) {
            endpoint.code = res.statusCode;
            console.log("statusCode: ", res.statusCode);
        }).on('error', function(e) {
            endpoint.code = 500;
            console.log("statusCode: ERROR");
        });
    });
}

setInterval(refreshEndpointStatus, 30000);
