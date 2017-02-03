export default function draftPlayer(dat, cb) {
  const data = dat;
  data.roomId = data.roomId || 1;

  if (!this.drafts[data.roomId]) {
    this.drafts[data.roomId] = [];
  }

  this.drafts[data.roomId].push({
    playerId: dat.playerId,
    teamId: data.teamId,
  });

  const callback = cb || function noop() {};

  return callback(undefined, this.drafts[data.roomId]);
}
