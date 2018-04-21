import React, { Component } from 'react';
import moment from 'moment';
import './message_form.css';

export default class MessageForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dest: props.dest,
            msg: ''
        }
    }

    componentWillReceiveProps({ dest }) {
        this.setState({ dest });
    }

    submitHanlder = (e) => {
        e.preventDefault();
    
        const { onMsgSend, activeUser } = this.props;
        const { msg, dest } = this.state;

        if (!msg) {
            return;
        }
        onMsgSend({ msg, src: activeUser, dest, date: moment().format('HH:mm:ss') });
        this.text.value = '';
    }

    handleChange = (e, name) => {
        this.setState({ [name]: e.target.value });
    }

    render() {
        const { dest } = this.state;
        return(
            <div className='msg-form-wrapper col-md-12'>
            {
                dest ?
                <form onSubmit={this.submitHanlder}>
                    <div className='form-row align-items-center'>
                        <div className='col-sm-11 my-1'>
                            <label className='sr-only' htmlFor='inlineFormInputName'>Name</label>
                            <input 
                                type='text'
                                className='form-control'
                                ref={text => { this.text = text; }}
                                placeholder='Type a message..'
                                onChange={(e) => this.handleChange(e, 'msg')}
                                required
                            />
                        </div>
                        <div className='col-auto my-1'>
                            <button type='submit' className='btn btn-primary'>Send</button>
                        </div>
                    </div>
                </form>
                :
                <div className='welcome'>
                    <h3>Welcome to the chat app!</h3>
                    <h5>click on your contacts - and start chatting</h5>
                    <h5>enjoy :)</h5>
                </div>
            }
            </div>
        )
    }
}