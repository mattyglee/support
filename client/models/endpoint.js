var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        name: ['string', true, ''],
        url: ['string', true, ''],
        code: 'number'
    },
    derived: {
        status: {
            deps: ['code'],
            fn: function () {
                if (this.code === 200) {
                    return "background-color: #99FF99";
                } else {
                    return "background-color: #FF9999";
                }
            }
        }
    }
});
