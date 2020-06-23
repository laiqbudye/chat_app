import React from 'react';
import './Infobar.css';
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';

export const Infobar = ({ room }) => {
    return (
        <div className='infoBar'>
            <div className='leftInnerContainer'>
                <img className='onlineIcon' src={onlineIcon}></img>
                <h3>{room}</h3>
            </div>

            <div className='rightInnerContainer'>
                <a href='/'> <img src={closeIcon}></img> </a>
            </div>
        </div>
    )
}
