var Collection = require('ampersand-rest-collection');
var Endpoint = require('./endpoint');


module.exports = Collection.extend({
    model: Endpoint,
    url: '/api/endpoints'
});
