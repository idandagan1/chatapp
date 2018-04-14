import React, { Component } from 'react';
import './messages.css';

export default class Message extends Component {

    render() {
        const { isGroup, src: { name }, msg, date } = this.props;
        return(
                <div className='col-md-12 msg-wrapper'>
                    <h4 className='msg-author'>{name}</h4>
                    <div>
                        <span>{msg}</span>
                    </div>
                    <span className='msg-date'>{date}</span>
                </div>
        )
    }
}