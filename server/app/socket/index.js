const config = require('./config.js');

const socket = (server) => {
  const io = require('socket.io')(server, config.chat);
  const clients = {};
  let classMessage = [{from:'fred',msg:'Hi'},{from:'okpe',msg:'wadup'}]
  let userActivities = [];
  let users = []
  console.log(clients)
  const nsp = io.of('/classrooms');
  nsp.on('connection', function (socket) {
    console.log(`New socket connection to \\classroom with id ${socket.id}`);
    
    // register current client  
    clients[socket.id] = socket.client

    socket.on('aRequestToAddUser', data => {

      socket.username = data.username;
      socket.room = data.classroom_id
      socket.join(data.classroom_id,(err) => {
        for (const key in socket.rooms) {
          if (socket.rooms.hasOwnProperty(key)) {
            const element = socket.rooms[key];
            console.log(`${key} - ${element}`)
          }
        }
      })  
      //send prevous message to socket
      socket.emit('updateMsg','SERVER',classMessage)
      // broadcast to existing sockets that someone joined
      socket.broadcast.to(data.classroom_id).emit('someoneJoined','SERVER',data.username+ ' has connected to this room')

      console.log(`joined ${data.classroom_id}`);
      
    });
  
    socket.on('leave', data => {
      // socket.leave(data.classroom_id)
      console.log('left',socket.room);

      // socket.broadcast.to(data.classroom_id).emit('left', {from:'server',msg:`someone left`});
      socket.leave(socket.room,(err) => {
        for (const key in socket.rooms) {
          if (socket.rooms.hasOwnProperty(key)) {
            const element = socket.rooms[key];
            console.log(`${key} - ${element}`)
          }
        }
      })
      socket.broadcast.to(socket.room).emit('updatechat_left','SERVER',socket.username + ' has left this room')
      
    });
  
    // socket.on('new message', data => {
    //   console.log(data);
    //   socket.broadcast
    //   .to(data.classroom_id)
    //   .emit('receive message', data)
    // });

    socket.on('disconnect',function(){
      delete clients[socket.id]
      socket.leave(socket.room)
      console.log(`${socket.id} disconnected`)
    });
  });
  
  // nsp.emit('hi', 'everyone!');
  // nsp.to('some room').emit('some event');

}

module.exports = { socket };