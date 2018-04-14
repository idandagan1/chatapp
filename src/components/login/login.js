import React, { Component } from 'react';
import './login.css';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            socket: props.socket,
            username: ''
        }
    }

    onLoginClick = (e) => {
        e.preventDefault();
        const { username, socket } = this.state;
        const { loginHandler } = this.props;
        if (!username) {
            return;
        }
        socket.emit('login', username, (err, users, activeUser) => {
            if (err) return console.log(err);
            return loginHandler(users, activeUser);
        });
    }

    handleChange = (e, name) => {
        this.setState({ [name]: e.target.value });
    }

    render() {
        return(
            <div className='login-wrapper col-md-4 col-sm-8'>
                <form onSubmit={this.onLoginClick}>
                    <div className='form-group'>
                        <input
                            type='text'
                            className='form-control'
                            placeholder='Enter your nickname'
                            onChange={(e) => this.handleChange(e, 'username')}
                            required
                        />
                        <small className='form-text text-muted'>nickname will be visible to all users.</small>
                    </div>
                    <button type='submit' className='btn btn-primary'>Login</button>
                </form>
            </div>
        )
    }
}