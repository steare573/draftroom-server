const sockets = {};
const debug = require('debug')('ffbl.server.socket-manager');
module.exports = {
  addUser: (room, user, socket) => {
    if (!sockets[room]) {
      sockets[room] = {};
    }

    if (!sockets[room][user]) {
      sockets[room][user] = {};
    }

    sockets[room][user] = socket;
  },
  sendAll: (room, event, data, cb) => {
    const callback = cb || function noop() {};
    const roomSockets = sockets[room];
    if (!roomSockets) {
      return callback(new Error(`Room ${room} does not exist`));
    }

    Object.keys(roomSockets).forEach((user) => {
      roomSockets[user].send(event, data);
    });

    return callback();
  },
  sendUser: (room, user, event, data, cb) => {
    const callback = cb || function () {};
    const roomSockets = sockets[room];
    if (!roomSockets) {
      return callback(new Error(`Room ${room} does not exist`));
    }

    debug(data);
    roomSockets[user].send(event, data);

    return callback();
  },
};
