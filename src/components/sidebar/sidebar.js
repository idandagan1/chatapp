import React, { Component } from 'react';
import userIcon from '../../resources/images/user.png';
import groupIcon from '../../resources/images/group.png';
import './sidebar.css';

export default class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: props.users[0]
        }
    }

    onUserClick = (uid, isGroup) => {
        const { handleClick } = this.props;
        this.setState({ selected: uid });
        handleClick({ uid, isGroup });
    }

    renderUser = (user, i) => {
        const { activeUser } = this.props;
        const { selected } = this.state;
        const { name, uid, isGroup } = user;
        const cls = `list-group-item ${uid === selected ? 'active' : ''}`
        return (
            activeUser.name === name ?
            null :
            <li
                key={i}
                className={cls}
                onClick={(e) => this.onUserClick(uid, isGroup)}
                id={uid}
            >
                <span>{name}</span>
                <img
                    alt='user'
                    className='user-icon'
                    src={isGroup ? groupIcon : userIcon}
                />
            </li>
        )
    }

    render() {
        const { users } = this.props;
        const uids = Object.keys(users);
        return(
            <div className='sidebar-wrapper col-md-3 col-sm-3 pull-left'>
                <h4>Contacts</h4>
                <ul className='list-group'>
                {
                    uids && uids.length > 0 ?
                        uids.map((uid, i) => this.renderUser(users[uid], i))
                        : null
                }
                </ul>
            </div>
        )
    }
}