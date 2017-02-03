export default (data, callback) => {
  const myLeague = this.leagues[data.roomId];

  const allTeams = myLeague.teams || [];
  const myTeam = allTeams.find(curTeam => curTeam.id === data.teamId) || { queue: [] };

  if (myTeam) {
    myTeam.queue = myTeam.queue.filter(playerId => data.playerId !== playerId);
  }

  return callback(
    undefined, { responseType: 'user', data: { queue: myTeam.queue, teamId: data.teamId } }
  );
};
