module.exports = function getTeamByUserId(data, cb) {
  const draftTeams = this.teams[data.roomId] || {};
  const userTeam = draftTeams[data.userId] || {};
  return cb(undefined, userTeam);
};
