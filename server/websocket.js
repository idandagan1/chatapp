const socketIO = require('socket.io');
const debug = require('debug')('websockets');
const { onMessage } = require('./controllers/messages');
const { onLogin, onLogout, } = require('./controllers/users');
const { onJoin } = require('./controllers/groups');
const redis = require('socket.io-redis');

module.exports = (server, isProd) => {
    
    const io = socketIO(server);

    if (isProd) {
        const { 
            REDIS_HOST: host,
            REDIS_PORT: port,
            REDIS_PASSWORD: password
        } = process.env;
        io.adapter(redis({ host, port, password }));
    }

    io.on('connection', (socket) => {

        const { id: uid } = socket;
        debug(`${uid} connected`);

        // user events
        socket.on('login', (username, cb) => {
            socket.join(username);
            onLogin(io, uid, username, cb);
        });

        socket.on('disconnect', () => {
            debug(`${uid} disconnected`);
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
            debug(e);
        });
      
    });

    io.on('error', err => {
        throw new Error('error while establishing websockets');
    })

}
