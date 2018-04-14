import React from 'react';
import './messages.css';


export default function Message(props) {
    const { src: { name }, msg, date } = props;
    return (
        <div className='col-md-12 msg-wrapper'>
            <h4 className='msg-author'>{name}</h4>
            <div>
                <span>{msg}</span>
            </div>
            <span className='msg-date'>{date}</span>
        </div>
    )
} 
