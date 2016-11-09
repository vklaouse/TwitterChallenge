var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var ent = require('ent');

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

var users = {};

io.sockets.on('connection', function(socket) {
    var pseudo = false;

    for (var k in users){
        socket.emit('newuser', users[k]);
    }

    socket.on('login', function(user){
        console.log(user);
        pseudo = user;
        users [pseudo.user] = user;
        socket.emit('logged');
        socket.broadcast.emit('newuser', pseudo);
    });

    socket.on('disconnect', function(){
        if (!pseudo){
            return false;
        }
        delete users[pseudo.username];
        io.sockets.emit('decoUser', pseudo);
    });

});

server.listen(8080);