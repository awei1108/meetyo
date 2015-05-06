# meetyo

Taipei Beginner Programmer Meetup [tbpm2015.herokuapp.com](http://tbpm2015.herokuapp.com)  

This is a sample application to demo how to integrate Meetup.com API with Yo API.

This application is based on [heroku Node.js app](https://github.com/heroku/node-js-getting-started.git)

# Install
1.git clone https://github.com/ucheng/meetyo.git  

2.Install related packages  
```
$ cd meetyo  
$ npm install  
```

# Run
1.Edit config/default.json  (update Yo API key and also Meetup.com API key)  

**For security reason, please don't commit your API key into git.**  

If you want to simply test it out, run  
```
$ node yo.js
```
It will send a yo message with a default url.  

2.Create a meetup db with a table named comments and a column comment_url.  

3.At the command-line, run  
```
$ node meetup.js
```

# Deploy
Please refer to [Heroku Doc](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction)
