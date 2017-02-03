// using this.chats smells bad...change this later
export default function getLeagueByDraft(data, callback) {
  return callback(undefined, this.leagues[data.draftId] || {});
}
