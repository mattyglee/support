var _ = require('lodash');
var http = require('http');
var request = require('request');

var endpoints = [
    {
        name: 'rrs',
        url: 'https://beta.betfair.com.au/aus/rrs/raceevent/1.120814923',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'rome',
        url: 'https://beta.betfair.com.au/aus/www/racing/navigation/v1/getMeetingHierarchy?alt=json&startDate=1442844000000&endDate=1443189600000',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'capi',
        url: 'https://beta.betfair.com.au/aus/Capi/v2/searchContent',
        method: 'post',
        payload: {"contentQueryList":[{"dimensionMap":{"dimensions.region":"ALL_REGIONS","dimensions.language":"en","dimensions.truevalue":"ALL_TRUEVALUES","dimensions.jurisdiction":"intl"},"filterQueryMap":{"capi-name":"ausFooterLinks","capi-addResponseMetadata":"true"}}]},
        code: 200,
        alive: true
    },
    {
        name: 'aus-ero',
        url: 'https://beta.betfair.com.au/aus/www/sports/exchange/readonly/v1/bymarket?currencyCode=AUD&alt=JSON&locale=en_GB&types=MARKET_STATE&marketIds=2.101305674',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'uk-ero',
        url: 'https://beta.betfair.com.au/uk/www/sports/exchange/readonly/v1/bymarket?currencyCode=AUD&alt=JSON&locale=en_GB&types=MARKET_STATE&marketIds=1.120814917',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'wallet',
        url: 'https://beta.betfair.com.au/uk/wallet/api/v2/wallets',
        method: 'get',
        headers: {
            'X-Application': 'C19908DE',
            'X-Authentication': 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx='
        },
        valid_response: 'INVALID_CREDENTIALS',
        code: 200,
        alive: true
    },
    {
        name: 'account',
        url: 'http://accountservices.sports1.release-alpha.dev.betfair/',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'login',
        url: 'http://identitysso.pp1.au.betfair/',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'facet',
        url: 'https://beta.betfair.com.au/uk/www/sports/navigation/facet/v1/search?alt=json',
        method: 'post',
        payload: {"filter":{"eventTypeIds":[null],"productTypes":["EXCHANGE"],"selectBy":"RANK","contentGroup":{"language":"en","regionCode":"UK"},"maxResults":0},"facets":[{"type":"EVENT_TYPE","maxValues":0,"skipValues":0,"applyNextTo":0}],"currencyCode":"GBP","locale":"en_AU"},
        code: 200,
        alive: true
    },
    {
        name: 'inplay',
        url: 'https://beta.betfair.com.au/uk/inplayservice/v1/eventDetails?alt=json&eventIds=27545550&fromTime=2015-09-22T00:50:00.000Z&locale=en_GB&productType=EXCHANGE&regionCode=UK&toTime=2015-09-22T00:51:00.000Z&ts=1442882485853',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'uk-bss',
        url: 'https://beta.betfair.com.au/uk/betslip-service/readonly/v1.1/fetch',
        method: 'post',
        headers: {
            'X-Application': 'sYkOW0qaRRsV3Cjl'
        },
        payload: {"exchangeOpenBetQuery":{"marketIds":["1.120708098"],"rollUp":"PRICE","openBetsLimit":1000,"includeSettledProfit":false}},
        valid_response: 'INVALID_ACCOUNT',
        code: 200,
        alive: true
    },
    {
        name: 'aus-bss',
        url: 'https://beta.betfair.com.au/aus/betslip-service/readonly/v1.1/fetch',
        method: 'post',
        headers: {
            'X-Application': 'sYkOW0qaRRsV3Cjl'
        },
        payload: {"exchangeOpenBetQuery":{"marketIds":["2.101306186"],"rollUp":"PRICE","openBetsLimit":1000,"includeSettledProfit":false}},
        valid_response: 'INVALID_ACCOUNT',
        code: 200,
        alive: true
    },
    {
        name: 'uk-etx',
        url: 'https://beta.betfair.com.au/uk/www/sports/exchange/readonly/v1/bymarket?currencyCode=AUD&alt=JSON&locale=en_GB&types=RUNNER_METADATA%2CRUNNER_DESCRIPTION%2CRUNNER_EXCHANGE_PRICES_BEST%2CMARKET_DESCRIPTION%2CRUNNER_SP%2CMARKET_STATE%2CEVENT%2CMARKET_RATES%2CRUNNER_STATE&marketIds=1.120828790',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'aus-etx',
        url: 'https://beta.betfair.com.au/aus/www/sports/exchange/readonly/v1/bymarket?currencyCode=AUD&alt=JSON&locale=en_GB&types=RUNNER_METADATA%2CRUNNER_DESCRIPTION%2CRUNNER_EXCHANGE_PRICES_BEST%2CMARKET_DESCRIPTION%2CRUNNER_SP%2CMARKET_STATE%2CEVENT%2CMARKET_RATES%2CRUNNER_STATE&marketIds=2.101305018',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'bat',
        url: 'http://batdata.preprod.au.betfair/',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'ausweb-assets',
        url: 'https://beta.betfair.com.au/aus/assets/',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'identitysso',
        url: 'http://identitysso.app.betfair/',
        method: 'get',
        code: 200,
        alive: true
    },
    {
        name: 'cro',
        url: 'https://beta.betfair.com.au/uk/cro/www/CustomerReadOnly/v1/retrieveCustomerDetails',
        method: 'post',
        headers: {
            'X-Application': 'C19908DE'
        },
        payload: '{"filters":["ACCOUNT_DATA","REWARDS_DATA"]}',
        valid_response: 'DSC-0008',
        code: 200,
        alive: true
    },
    //{
    //    name: 'aus-cashout',
    //    url: 'http://cos-aco-service.au.app.betfair/',
    //    method: 'get',
    //    code: 200,
    //    alive: true
    //},
    //{
    //    name: 'uk-cashout',
    //    url: 'http://cos-uco-service.au.app.betfair/',
    //    method: 'get',
    //    code: 200,
    //    alive: true
    //},
    {
        name: 'uk-strands',
        url: 'https://beta.betfair.com.au/uk/strands/api/eds/racing-navigation/v1?eventId=27299056&eventTypeId=7&navigationType=marketsbyevent',
        method: 'get',
        headers: {
            'X-Application': 'sYkOW0qaRRsV3Cjl',
            'Referer': 'https://beta.betfair.com.au/racing/antepost/melbourne-cup-2015/2.101060841'
        },
        valid_response: 'Application not identified',
        code: 200,
        alive: true
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
        if(endpoint.method === 'post') {
            makePost(endpoint);
        } else {
            makeGet(endpoint);
        }
    });
}

function makePost(endpoint) {
    options = {
        url: endpoint.url,
        body: endpoint.payload,
        json: true
    }
    request.post(options,
        function (error, res, body) {
            if (!error) {
                console.log("POST statusCode: ", res.statusCode);
                endpoint.code = res.statusCode;
                if(endpoint.code == 200) {
                    endpoint.alive = true;
                } else if(endpoint.valid_response != 'undefined' && JSON.stringify(body).indexOf(endpoint.valid_response) > -1) {
                    // console.log(endpoint.url, res.statusCode, JSON.stringify(body));
                    endpoint.alive = true;
                } else {
                    // console.log(endpoint.url, res.statusCode, JSON.stringify(body));
                    endpoint.alive = false;
                }
            } else {
                console.log("POST statusCode: ERROR");
                endpoint.code = 500;
                endpoint.alive = false;
            }
        }
    );
}

function makeGet(endpoint) {
    options = {
        url: endpoint.url,
        headers: endpoint.headers
    }
    request.get(endpoint.url,
        function(error, res, body) {
            if (!error) {
                console.log("GET statusCode: ", res.statusCode);
                endpoint.code = res.statusCode;
                if(endpoint.code == 200) {
                    endpoint.alive = true;
                } else if(endpoint.valid_response != 'undefined' && body.indexOf(endpoint.valid_response) > -1) {
                    // console.log(endpoint.url, res.statusCode, body);
                    endpoint.alive = true;
                } else {
                    // console.log(endpoint.url, res.statusCode, body);
                    endpoint.alive = false;
                }
            } else {
                console.log("GET statusCode: ERROR");
                endpoint.code = 500;
                endpoint.alive = false;
            }
        }
    );
}

setInterval(refreshEndpointStatus, 10000);
