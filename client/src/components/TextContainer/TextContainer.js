import React from 'react';
import './TextContainer.css';
import onlineIcon from '../../icons/onlineIcon.png';

export const TextContainer = ({ users }) => {
    return (
        <div className="textContainer">
            {
                users
                    ? (
                        <div>
                            <h1>ChitChat</h1>
                            <h2>Online Users:</h2>
                            <div className="activeContainer">
                                <h2>
                                    {users.map(({ name }) => (
                                        <div key={name} className="activeItem">
                                            {name}
                                            <img alt="Online Icon" src={onlineIcon} />
                                        </div>
                                    ))}
                                </h2>
                            </div>
                        </div>
                    )
                    : null
            }
        </div>
    )
}
