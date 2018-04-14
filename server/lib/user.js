const users = {};

exports = module.exports = (uid, username) => {
    if (!uid || !username) {
        return new Error('uid and username are required');
    }

    users[uid] = {
        name: username,
        uid,
        lastLogged: new Date()
    }

    return users[uid];
}

exports.getUserById = (uid) => {
    return users[uid];
}

exports.logout = (uid) => {
    console.log(`${uid} logging out`);
    delete users[uid];
}

exports.getUsers = () => {
    return users;
}
