import React, { Component } from 'react';
import Message from './msg';
import './messages.css';

export default class Messages extends Component {

    constructor(props) {
        super(props);
        this.state =  {
            messages: props.messages || []
        }
    }

    componentWillReceiveProps({ messages }) {
        this.setState({ messages });
    }

    renderMsg = (msgObj, i) => {
        const { msg, src, date, dest } = msgObj;
        return (
            <li key={i} className='list-msg-item'>
                <Message msg={msg} src={src} date={date} isGroup={dest.isGroup}/>
            </li>
        )
    }

    render() {
        const { messages } = this.state;
        return(
            <div className='col-md-12 messages-wrapper'>
                <ul className='list-group'>
                    { messages && messages.length > 0 ?
                        messages.map((msg, key) => this.renderMsg(msg, key))
                        : null
                    }
                </ul>
            </div>
        )
    }
}