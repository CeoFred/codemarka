import {chat} from "./config";

export default  (server: any) => {
    const io = require("socket.io")(server, chat);
    const clients: any[] = [];
    let classMessage = [{from:"fred",msg:"Hi"},{from:"okpe",msg:"wadup"}];
 
    console.log(clients);
    const nsp = io.of("/classrooms");
    nsp.on("connection", function (socket: any) {
        console.log(`New socket connection to \\classroom with id ${socket.id}`);
    
        // register current client  
        clients[socket.id] = socket.client;
        interface JoinObj  {
            username: string;
            classroom_id: string;
        }
        socket.on("aRequestToAddUser", (data: JoinObj) => {

            socket.username = data.username;
            socket.room = data.classroom_id;
            socket.join(data.classroom_id,() => {
                for (const key in socket.rooms) {
                    if (socket.rooms.hasOwnProperty(key)) {
                        const element = socket.rooms[key];
                        console.log(`${key} - ${element}`);
                    }
                }
            });  
            //send prevous message to socket
            socket.emit("updateMsg","SERVER",classMessage);
            // broadcast to existing sockets that someone joined
            socket.broadcast.to(data.classroom_id).emit("someoneJoined","SERVER",data.username+ " has connected to this room");

            console.log(`joined ${data.classroom_id}`);
      
        });
  
        socket.on("leave", () => {
            // socket.leave(data.classroom_id)
            console.log("left",socket.room);

            // socket.broadcast.to(data.classroom_id).emit('left', {from:'server',msg:`someone left`});
            socket.leave(socket.room,() => {
                for (const key in socket.rooms) {
                    if (socket.rooms.hasOwnProperty(key)) {
                        const element = socket.rooms[key];
                        console.log(`${key} - ${element}`);
                    }
                }
            });
            socket.broadcast.to(socket.room).emit("updatechat_left","SERVER",socket.username + " has left this room");
      
        });
  
        // socket.on('new message', data => {
        //   console.log(data);
        //   socket.broadcast
        //   .to(data.classroom_id)
        //   .emit('receive message', data)
        // });

        socket.on("disconnect",function(){
            delete clients[socket.id];
            socket.leave(socket.room);
            console.log(`${socket.id} disconnected`);
        });
    });
  
    // nsp.emit('hi', 'everyone!');
    // nsp.to('some room').emit('some event');

};
