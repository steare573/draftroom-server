// using this.chats smells bad...change this later
module.exports = function getConversation(data, callback) {
  return callback(undefined, this.chats[data.roomId] || []);
};
