const BaseTopic = require('../base');
const draftHandler = require('./handler/draftPlayer');
const getDraftedHandler = require('./handler/getDraftedPlayers');
const getLeagueByDraft = require('./handler/getLeagueByDraft');
const queuePlayerHandler = require('./handler/queuePlayer');
const unqueuePlayerHandler = require('./handler/unqueuePlayer');

module.exports = class ChatTopic extends BaseTopic {
  constructor() {
    super();
    this.drafts = {};
    this.leagues = {
      1: {
        id: 1,
        name: 'My crazy league',
        teams: [
          {
            id: 3,
            userId: 1,
            name: 'Team 1 from server',
            queue: [],
          },
          {
            id: 4,
            userId: 2,
            name: 'Team 2 from server',
            queue: [],
          },
        ],
      },
    };
    this.registerEvent('player', draftHandler);
    this.registerEvent('getdraftedplayers', getDraftedHandler);
    this.registerEvent('getleague', getLeagueByDraft);
    this.registerEvent('queueplayer', queuePlayerHandler);
    this.registerEvent('unqueueplayer', unqueuePlayerHandler);
  }
};
