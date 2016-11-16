/**
*   Dependencies
**/

var express = require('express');
var app = express();
var path = require('path');
var ent = require('ent');
var twit = require('twitter');

app.set('port', 8080);
app.use(express.static(path.join(__dirname, 'public')));
var server = app.listen(app.get('port'), function() {
    var port = server.address().port;
});

app.get('*', function(req, res){
    res.status(404).send('Error 404 page not found');
});

var io = require('socket.io').listen(server);
var configuration = require('./configuration.js');
var hashtag = configuration.tag;
var consumerKey = configuration.consumerKey;
var consumerSecret = configuration.consumerSecret;
var accessTokenKey = configuration.accessTokenKey;
var accessTokenSecret = configuration.accessTokenSecret;

/**
*   Connection to the twitter application
**/

twitter = new twit({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token_key: accessTokenKey,
    access_token_secret: accessTokenSecret
});

/**
*   Create a table for the users
**/

var users = {};
var bestScore = 0;

/**
*   Connection to the socket
**/

io.sockets.on('connection', function(socket) {
    var pseudo = false;

    /**
    *   Show the best score to the new users
    **/

    socket.emit('highScore', bestScore);

    /**
    *   Send the new best Score
    **/

    socket.on('score', function(Score){
        if (Score > bestScore){
            bestScore = Score;
            io.sockets.emit('bestScore', bestScore);
        }
    });

    /**
    *  Send the list of all users to the new user
    **/

    for (var k in users){
        socket.emit('newuser', users[k]);
    }

    /**
    *   Give a name and a random id to the new user
    **/

    socket.on('login', function(user){
        pseudo = user;
        pseudo.username = ent.encode(pseudo.username);
        var UserIdStr = user.id.toString();
        pseudo.id = UserIdStr;
        users [pseudo.id] = pseudo;
        socket.emit('logged');
        io.sockets.emit('newuser', pseudo);
        io.sockets.emit('HideNewUser', pseudo);
    });

    /**
    *   Destroy the informations of a user when he disconnect
    **/

    socket.on('disconnect', function(){
        if (!pseudo){
            return false;
        }
        delete users[pseudo.id];
    });

    /**
    *   Get the twitter stream and sends him to client.js
    **/

    twitter.stream('statuses/filter', { track: hashtag },
        function(stream) {
 
        stream.on('data', function( tweet ) {
            var tweet_id = tweet.id_str;
            var tweet_text = tweet.text;
            io.sockets.emit('tweet', tweet);
        });
 
        stream.on('error', function ( error ) {
        });
    });
});
