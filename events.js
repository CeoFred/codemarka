module.exports = function events(socket) {

users = Array();


 console.log('a user connected with id ' + socket.id);
  socket.on('login', function(data){

   if(users.length > 0){
    users.forEach(user => {
     if (user.email == data.email) {
      return;
     } else {
      users.push(data);
      console.log(users);
      socket.emit('accepted');

     }
    });
   }else{
    users.push(data);
    console.log(users);
    socket.emit('accepted',data);
   }
   
  })

 
 socket.on('chat message', function (msg) {
  console.log('message: ' + msg);
  socket.emit('new message', msg);
 });
}

