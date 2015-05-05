var https = require('https');
var http = require('http');
var querystring = require('querystring');
var pg = require('pg');
var JSONbig = require('json-bigint');
var config = require('config');
var yoer = require('./yo.js');

function execute() {

https.get(config.get('meetup.url') , function (res) {
    
    var data = '';
    res.on('data', function(datachunk) {
      data += datachunk;
    });

    res.on('end', function() {
      var meetupResponse = JSONbig.parse(data);
      console.log(meetupResponse.results);
      //query db
      var connectionUri = process.env.DATABASE_URL || "postgres://localhost:5432/meetup";

      pg.connect(connectionUri, function(err, client, done) {
        
        client.query('SELECT * FROM comments', function(err, dbResult) {
        done();
        if (err) {
          console.error(err);
        } else {

          if (meetupResponse.results.length > dbResult.rows.length) {
            var newComment = meetupResponse.results[0];
            
            client.query("INSERT INTO comments (comment_url) values($1)", [newComment.comment_url], function(err, insertResult){
              done();
              if (err) { console.error(err);}
            });

            yoer.yo(newComment.comment_url);

          }//end sending yo

        }//end else
      
       });//end select
      });//end pg.connect
    });// end res.on('end')

}).on('error', function(e) {
  console.error(e);
});


}

execute();