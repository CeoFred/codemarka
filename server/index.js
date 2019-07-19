const app = require('./app');
const http = require('http').createServer(app)
require('dotenv').config()

const db = require('./config/db')

const config = require('./config/config')
const debug = require('debug')('colab:app');
const socket = require('./app/socket/index');
socket.socket(http);
// socket.room_socket(http);

http.listen(config.server.port,() => {
  console.log('listening on  port '+config.server.port)
});


// require('./app/socket')(http)
db.on('connected', () => {
    app.emit('appStarted');
    console.log('Connected to mongodb')
    debug(`App listening on ${config.server.hostname} port: ${config.server.port}`);

});

