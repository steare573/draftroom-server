// using this.chats smells bad...change this later
export default function getDraftedPlayers(data, callback) {
  return callback(undefined, this.drafts[data.roomId] || []);
}
