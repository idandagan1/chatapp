import React, { Component } from 'react';
import io from 'socket.io-client';
import Header from '../header/header';
import Login from '../login/login';
import Sidebar from '../sidebar/sidebar';
import Messages from '../messages/messages';
import MessageForm from '../message_form/message_form';
import config from '../../config';
import './app.css';

export default class App extends Component {

  constructor() {
    super()
    this.state = {
      socket: io(config.endpoint),
      isLogged: false,
      activeUser: '',
      selected: '',
      messages: [],
      users: {}
    }
  }

  componentDidMount(props) {
    const { socket } = this.state;

    socket.on('joined', (user) => {
      const { users } = this.state;
      users[user.uid] = user;
      this.setState({ users });
    })

    socket.on('messageRecieve', (msg) => {
      const { messages, selected } = this.state;

      let acceptMsg = false;
      if (msg.dest.isGroup) {
        acceptMsg = selected.uid === msg.dest.uid;
      } else {
        acceptMsg = selected.uid === msg.src.uid;
      }

      if (acceptMsg) {
        messages.push(msg);
        this.setState({ messages });
      }
    })

    socket.on('logout', (users) => {
      this.setState({ users });
    })

  }

  handleMsg = (msg) => {
    const { socket } = this.state;
    socket.emit('newMessage', msg, (err, newMsg) => {
      if (err) console.log(err);
      const { messages } = this.state;
      messages.push(newMsg);
      this.setState({ messages });
    });
  }

  onLogin = (users, activeUser) => {
    this.setState({ isLogged: true, users, activeUser });
  }

  onJoinGroup = (groupId) => {
    const { users, socket, activeUser: { name } } = this.state;
    users[groupId] = { name: groupId, uid: groupId, isGroup: true };
    socket.emit('join', { groupId, name }, (err) => {
      if (err) console.log(err);
    });
    this.setState({ users });
  }

  onUserClick = (selected) => {
    this.setState({ selected, messages: [] });
  }

  render() {
    const { messages, socket, isLogged, activeUser, users, selected } = this.state;
    
    return (
      <div className='app-wrapper'>
        <Header
          isLogged={isLogged}
          username={activeUser.name}
          handleJoin={this.onJoinGroup}
        />
        {
          isLogged ?
          <div className='ch-body'>
              <Sidebar 
                users={users}
                activeUser={activeUser}
                socket={socket}
                handleClick={this.onUserClick}
              />
              <div className='main-wrapper col-md-9 col-sm-9'>
                  <MessageForm
                    onMsgSend={this.handleMsg}
                    dest={selected}
                    activeUser={activeUser}
                  />
                  <Messages
                    messages={messages}
                  />
              </div>
          </div>
          :
          <Login
            socket={socket}
            loginHandler={this.onLogin}
          />
        }
      </div>
    )
  }

}
