const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');
const {addUser, removeUser, getUser, getAllUsersInRoom} = require('./users');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on('connection', (socket)=> {  // socket- is a client instance of socket which is in Chat.js
    console.log(`We have a new connection...`);

    socket.on('join', ({name, room}, callback) => {
        const { error, user } = addUser({id: socket.id, name:name, room: room});    // here error & user we are getting from adduser's definition

        if(error) return callback(error);

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined the chat`});

        socket.join(user.room);

        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);

        io.to(user.room).emit('message', { user: user.name, text: message})
    });

    socket.on('disconnect', () => {
        console.log(`User had left the chat`)
    })
})

app.use(router);
server.listen(PORT, () => console.log(`server started running on ${PORT}`))

