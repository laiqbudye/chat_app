import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';

export const Message = ({message: { text, user }, name }) => {
    let isSentByCurrentUser;

    const curUserName = name.trim().toLowerCase();
    
    if (user === curUserName) {
        isSentByCurrentUser = true;
    }
    console.log("sent by user:"+isSentByCurrentUser)
    return (
        isSentByCurrentUser
            ? (
                <div className="messageContainer justifyEnd">
                    <p className="sentText pr-10">{curUserName}</p>
                    <div className="messageBox backgroundBlue">
                        <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
                    </div>
                </div>
            )
            : (
                <div className="messageContainer justifyStart">
                    <div className="messageBox backgroundLight">
                        <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                    </div>
                    <p className="sentText pl-10 ">{user}</p>
                </div>
            )
    )
}
