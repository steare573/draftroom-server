import debugMod from 'debug';

const sockets = {};

const debug = debugMod('ffbl.server.socket-manager');
export const addUser = (room, user, socket) => {
  if (!sockets[room]) {
    sockets[room] = {};
  }

  if (!sockets[room][user]) {
    sockets[room][user] = {};
  }

  sockets[room][user] = socket;
};

export const sendAll = (room, event, data, cb) => {
  const callback = cb || function noop() {};
  const roomSockets = sockets[room];
  if (!roomSockets) {
    return callback(new Error(`Room ${room} does not exist`));
  }

  Object.keys(roomSockets).forEach((user) => {
    roomSockets[user].send(event, data);
  });

  return callback();
};
export const sendUser = (room, user, event, data, callback = () => {}) => {
  const roomSockets = sockets[room];
  if (!roomSockets) {
    return callback(new Error(`Room ${room} does not exist`));
  }

  debug(data);
  roomSockets[user].send(event, data);

  return callback();
};

export default {
  addUser,
  sendAll,
  sendUser,
};
