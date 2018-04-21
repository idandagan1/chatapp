import React, { Component } from 'react';
import './headers.css';
export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            groupId: ''
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        const { handleJoin } = this.props;
        const { groupId } = this.state;
        handleJoin(groupId);
        this.groupId.value = '';
    }

    handleChange = (e, name) => {
        this.setState({ [name]: e.target.value });
    }

    render() {
        const { isLogged, username } = this.props;
        return(
            <div className='headers'>
                <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                {
                    isLogged ?
                    <div className='navbar-collapse'>
                        <form className='form-inline col-md-4 col-lg-3 col-sm-5' onSubmit={this.onSubmit}>
                            <input 
                                className='form-control mr-sm-4'
                                type='text'
                                ref={ groupId => this.groupId = groupId }
                                placeholder='Search for a group'
                                aria-label='Search'
                                onChange={(e) => this.handleChange(e, 'groupId')}
                                required
                            />
                            <button className='btn btn-outline-success my-2 my-sm-0' type='submit'>+</button>
                        </form>
                        <div className='col-md-3'>
                            <h4>Hello {username}</h4>
                        </div>
                    </div>
                    :
                    <h3>Welcome to the ChatApp</h3>
                }
                </nav>
            </div>
        )
    }
}