const express = require('express');
const http = require('http');
const socketio = require('socket.io');
const router = require('./router');
const cors = require('cors');
const {addUser, removeUser, getUser, getAllUsersInRoom} = require('./users');
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(router);
app.use(cors());  //cross origin resource sharing.... if i dont add this then may be some request get ignored

io.on('connection', (socket)=> {  // socket- is a client instance of socket which is in Chat.js

    socket.on('join', ({name, room}, callback) => {
       
        const { error, user } = addUser({id: socket.id, name:name, room: room});    // here error & user we are getting from adduser's definition

        if(error) return callback(error);
        socket.join(user.room);
        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`});
        socket.broadcast.to(user.room).emit('message', {user: 'admin', text: `${user.name} has joined the chat`});

        socket.join(user.room);

        //emitting all available users in current room
        io.to(user.room).emit('roomData', {room: user.room, users: getAllUsersInRoom(user.room)});
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id);
    
        io.to(user.room).emit('message', { user: user.name, text: message});
        io.to(user.room).emit('roomData', {room: user.room, users: getAllUsersInRoom(user.room)});
        callback();
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left the chat.`})
        }
    })
})

server.listen(PORT, () => console.log(`server started running on ${PORT}`))

