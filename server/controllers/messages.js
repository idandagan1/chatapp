const { createMsg } = require('../lib/utils');
const debug = require('debug')('messages');

exports.onMessage = (socket, msgObj, cb) => {
    const { src, dest, msg } = msgObj;

    if (typeof src !== 'object' || typeof dest !== 'object') {
        return cb('src and dest are required');
    }
    if (msg === undefined) {
        return cb('message is required');                
    }

    debug(`sending msg from ${src.name} to ${dest.uid}`);
    socket.to(dest.uid).emit('messageRecieve', msgObj);
    cb(null, msgObj);
}
