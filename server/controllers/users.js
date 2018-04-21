const User = require('../lib/user');
const debug = require('debug')('user');

exports.onLogin = (io, uid, username, cb) => {

    if (!username) {
        return callback('username is required');
    }

    const activeUser = User(uid, username);
    const users = User.getUsers();

    debug(`${username} logged in`);
    io.sockets.emit('joined', users[uid]);

    cb(null, users, activeUser);
}

exports.onLogout = (io, uid) => {
    User.logout(uid);
    debug(`${uid} logged out`);
    io.sockets.emit('logout', User.getUsers());
}
