var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        name: ['string', true, ''],
        url: ['string', true, ''],
        code: 'number',
        alive: 'boolean'
    },
    derived: {
        status: {
            deps: ['alive'],
            fn: function () {
                if (this.alive) {
                    return "background-color: #99FF99";
                } else {
                    return "background-color: #FF9999";
                }
            }
        },
        shortUrl: {
            deps: ['url'],
            fn: function () {
                return this.url.substr(0, 100) + '...';
            }
        }
    }
});
