const http = require('http');
const express = require('./app');


const port = process.env.PORT || 3001;

const app = http.createServer(express);
const io = require('socket.io')(app);

app.get('*',(req,res,next) => {
  io.on('connection', function (socket) {
    console.log('connected');

    socket.on('chat', function (msg) {
      console.log('New message')
    })
  })
})

app.listen(port,() => {
  console.log('listening on  port '+port)
});
