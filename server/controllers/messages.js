const { createMsg } = require('../lib/utils');

exports.onMessage = (socket, msgObj, cb) => {
    const { src, dest, msg } = msgObj;
    if (typeof src !== 'object' || typeof dest !== 'object') {
        return cb('src and dest are required');
    }
    if (msg === undefined) {
        return cb('message is required');                
    }
    console.log(`sending msg from ${src.name} to ${dest.uid}`);
    socket.to(dest.uid).emit('messageRecieve', msgObj);
    cb(null, msgObj);
}
