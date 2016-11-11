/**
*
**/

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ent = require('ent');
var twit = require('twitter');

/**
*
**/

twitter = new twit({
    consumer_key: '3GfegpTIRmndaEHwJcDX9e4j5',
    consumer_secret: 'rTQxCS17P9r4a9lrE7EMO3KA7jEnufiD3LO7p7wTLNxmC9g04D',
    access_token_key: '2776305215-bJiqHRwcEwh5O8J8TUe1n6sWu6vU2Di9XdsLVO6',
    access_token_secret: '6dEu1vMXIuALwuyU93FTcWRv3FaWItXgMsC1WBmpzVGfa'
});

/**
*
**/

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

/**
*
**/

var users = {};

/**
*
**/

io.sockets.on('connection', function(socket) {
    var pseudo = false;

    for (var k in users){
        socket.emit('newuser', users[k]);
    }

    /**
    *
    **/

    socket.on('login', function(user){
        pseudo = user;
        users [pseudo.user] = user;
        socket.emit('logged');
        socket.broadcast.emit('newuser', pseudo);
    });

    /**
    *
    **/

    socket.on('disconnect', function(){
        if (!pseudo){
            return false;
        }
        delete users[pseudo.username];
        io.sockets.emit('decoUser', pseudo);
    });

    /**
    *
    **/

    twitter.stream('statuses/filter', { track: '#Trump' },
        function(stream) {
 
        stream.on('data', function( tweet ) {
            var tweet_id = tweet.id_str;
            var tweet_text = tweet.text;
            io.sockets.emit('tweet', tweet);
        });
 
        stream.on('error', function ( error ) {
            console.error(error);
        });
 
    });

});

server.listen(8080);