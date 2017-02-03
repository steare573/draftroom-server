// using this.chats smells bad...change this later
export default function getConversation(data, callback) {
  return callback(undefined, this.chats[data.roomId] || []);
}
