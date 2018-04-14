const { createMsg } = require('../lib/utils');
const User = require('../lib/user');

exports.onJoin = (ws, params, cb) => {
    const { name, groupId } = params;
        
    if (!groupId) {
        return callback('groupId are required');
    }

    ws.join(groupId);

    console.log(`${name} joined the group ${groupId}`);

    cb(null, groupId);
}

exports.onLogin = (io, uid, username, cb) => {

    if (!username) {
        return callback('username is required');
    }

    const activeUser = User(uid, username);
    const users = User.getUsers();

    console.log(`${username} logged in`);
    io.sockets.emit('joined', users[uid]);

    cb(null, users, activeUser);
}

exports.onLogout = (io, uid) => {
    User.logout(uid);
    io.sockets.emit('logout', User.getUsers());
}
