// using this.chats smells bad...change this later
export default (data, callback) => callback(undefined, this.chats[data.roomId] || []);
