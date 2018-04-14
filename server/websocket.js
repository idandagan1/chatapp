const socketIO = require('socket.io');
const { onMessage } = require('./controllers/messages');
const { onLogin, onLogout, } = require('./controllers/users');
const { onJoin } = require('./controllers/groups');

module.exports = (server) => {
    
    const io = socketIO(server);

    io.on('connection', (socket) => {

        const { id: uid } = socket;
        console.log(`${uid} connected`);

        // user events
        socket.on('login', (username, cb) => {
            socket.join(username);
            onLogin(io, uid, username, cb);
        });

        socket.on('disconnect', () => {
            onLogout(io, uid);
        });

        // group events
        socket.on('join', (params, cb) => {
            onJoin(socket, params, cb);
        });

        // msg events
        socket.on('newMessage', (params, cb) => {
            onMessage(socket, params, cb);
        });

        // other events
        socket.on('error', e => {
            console.error(e);
        });
      
    });

    io.on('error', err => {
        throw new Error('error while establishing websockets');
    })

}
