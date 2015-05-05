var express = require('express');
var pg = require('pg');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
  // response.send('Hello World!');
  response.render('index');
});

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/meetup';

app.get('/db', function (request, response) {
  pg.connect(connectionString, function(err, client, done) {

    // client.query("INSERT INTO comments (event_comment_id, is_yoed, comment_url) values($1, $2, $3)", [123, false, '222'], function(err, result){
    //       done();
    //   if (err)
    //    { console.error(err); response.send("Error " + err); }
    //   else
    //    { response.send(result.rows); }

    // });

    client.query('SELECT * FROM comments', function(err, result) {
      done();
      if (err) { 
        console.error(err); response.send("Error " + err);
      } else { 
        response.send(result.rows); 

      }
    });//end query

  });//end pg.connect

});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
