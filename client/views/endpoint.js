var View = require('ampersand-view');
var templates = require('../templates');


module.exports = View.extend({
    template: templates.includes.endpoint,
    bindings: {
        'model.name': '[data-hook~=name]',
        'model.shortUrl': '[data-hook~=url]',
        'model.code': '[data-hook~=code]',
        'model.status': {
            type: 'attribute',
            hook: 'endpoint-status',
            name: 'style'
        }
    }
});
