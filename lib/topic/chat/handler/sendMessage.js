// using this.chats smells bad...fix this later
module.exports = function sendMessage(dat, cb) {
  const data = dat;
  data.roomId = data.roomId || 1;

  if (!this.chats[data.roomId]) {
    this.chats[data.roomId] = [];
  }

  this.chats[data.roomId].push({
    message: data.message,
    sender: data.teamId,
  });

  const callback = cb || function noop() {};
  return callback(undefined, this.chats[data.roomId]);
};
