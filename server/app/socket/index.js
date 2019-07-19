const config = require('./config.js');

const socket = (server) => {
  const io = require('socket.io')(server, config.chat);

  // io.on('connection', function (socket) {
  //   console.log('a user connected to the chat');

  //   socket.on('disconnect', function () {
  //     console.log('user disconnected');
  //   });

  //   socket.on('client message', function (msg) {
  //     io.emit('server_message', msg);
  //   });
  // });

  const nsp = io.of('/classroom');
  nsp.on('connection', function (socket) {
    console.log('someone joined classroom socket');
    // socket.join('some room');
   
    socket.on('join', data => {
      console.log('room join');
      console.log(data);
      socket.join(data.room);
    });
  
    socket.on('leave', data => {
      console.log('leaving room');
      console.log(data);
      socket.leave(data.room)
    });
  
    socket.on('new message', data => {
      console.log(data.room);
      socket.broadcast
      .to(data.room)
      .emit('receive message', data)
    });
  });
  // nsp.emit('hi', 'everyone!');
  // nsp.to('some room').emit('some event');

}

module.exports = { socket };