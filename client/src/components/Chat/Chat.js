import React, { useEffect, useState } from 'react';
import './Chat.css';
import queryString from 'query-string';
import io from 'socket.io-client';
import {Infobar} from '../Infobar/Infobar';
import {Input} from '../Input/Input';
import {Messages} from '../Messages/Messages';
import {TextContainer} from '../TextContainer/TextContainer';

let socket;

export const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState('');
    const ENDPOINT = 'https://chit-chat1.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', {name: name, room: room},(error) => {
            if(error) {
              alert(error);
            }
          });  // sending join event on backend
    
        return(() => {   // this line will get execute on componentwillunmount
            socket.emit('disconnect');

            socket.off();
        })
    },[ENDPOINT, location.search]);

    useEffect(() => {
        socket.on('message', message => {
            setMessages(messages => [...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
          });
    },[]);

    //function to send message
    const sendMessage = (e) => {
        e.preventDefault();  // preventing browser from refresh 

        if(message){
            socket.emit('sendMessage', message, () => setMessage('')); // emitting send msg event which will listen by server and in callback function clearing current messgae
        }
    };
    return (
        <div className='outerContainer'> 
            <div className='container'>
                <Infobar room={room}/>
                <Messages messages={messages} name={name}/>
                <Input 
                message={message}
                setMessage={setMessage}
                sendMessage={sendMessage}/>
            </div>
            <TextContainer users={users}/>
        </div>
    )
}
