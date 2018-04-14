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