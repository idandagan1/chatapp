const debug = require('debug')('groups');

exports.onJoin = (ws, params, cb) => {
    const { name, groupId } = params;
        
    if (!groupId) {
        return callback('groupId are required');
    }

    ws.join(groupId);

    debug(`${name} joined the group ${groupId}`);

    cb(null, groupId);
}
