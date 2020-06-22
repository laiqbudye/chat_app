const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');

const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=> {
    console.log(`We have a new connection...`);

    socket.on('disconnect', () => {
        console.log(`User had left the chat`)
    })
})

app.use(router);
server.listen(PORT, () => console.log(`server started running on ${PORT}`))

