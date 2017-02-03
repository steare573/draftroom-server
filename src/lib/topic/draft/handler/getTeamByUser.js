export default function getTeamByUser(data, cb) {
  const draftTeams = this.teams[data.roomId] || {};
  const userTeam = draftTeams[data.userId] || {};
  return cb(undefined, userTeam);
}
