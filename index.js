var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var auth = require('./api/routes/auth')

let events = require('./events');

app.get('/', function (req, res) {
 res.sendFile(__dirname + '/static/index.html');
});

app.get('/room', function (req, res) {
 res.sendFile(__dirname + '/static/room.html');
});

app.post('/auth', auth);

io.on('connection', function (socket) {
  events(socket);

  socket.on('disconnect', function () {
    console.log('user disconnected');
  });

});

http.listen(3000, function () {
 console.log('listening on *:3000');
});