import BaseTopic from '../base';
import draftHandler from './handler/draftPlayer';
import getDraftedHandler from './handler/getDraftedPlayers';
import getLeagueByDraft from './handler/getLeagueByDraft';
import queuePlayerHandler from './handler/queuePlayer';
import unqueuePlayerHandler from './handler/unqueuePlayer';

export default class ChatTopic extends BaseTopic {
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
    this.registerEvent('player', draftHandler.bind(this));
    this.registerEvent('getdraftedplayers', getDraftedHandler.bind(this));
    this.registerEvent('getleague', getLeagueByDraft.bind(this));
    this.registerEvent('queueplayer', queuePlayerHandler.bind(this));
    this.registerEvent('unqueueplayer', unqueuePlayerHandler.bind(this));
  }
}
