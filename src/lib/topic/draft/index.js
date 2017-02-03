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
    this.registerEvent('player', draftHandler);
    this.registerEvent('getdraftedplayers', getDraftedHandler);
    this.registerEvent('getleague', getLeagueByDraft);
    this.registerEvent('queueplayer', queuePlayerHandler);
    this.registerEvent('unqueueplayer', unqueuePlayerHandler);
  }
}
