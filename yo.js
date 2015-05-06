var https = require('https');
var querystring = require('querystring');
var config = require('config');
var _this = this;

//when something happend, send yo with the url to the subscribers
exports.yo = function(url) {
    url = url || "http://www.meetup.com/TaipeiBeginnerProgrammers/";
    var post_data = querystring.stringify({
        'api_token' : config.get('yo.apiToken'),
        'link':  url
    });

    var post_options = {
        host: 'api.justyo.co',
        path: '/yoall/',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': post_data.length
        }
    };

    var post_req = https.request(post_options, function(res) {
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('Response: ' + chunk);
        });
    });

      post_req.write(post_data);
      post_req.end();
};

function execute() {
    _this.yo();
}

execute();