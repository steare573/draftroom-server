import BaseTopic from '../base';
import getHandler from './handler/getById';

export default class ChatTopic extends BaseTopic {
  constructor() {
    super();
    this.users = {
      1: {
        id: 1,
        firstName: 'Sean',
        lastName: 'Teare',
      },
      2: {
        id: 2,
        firstName: 'Testme',
        lastName: 'McTesterson',
      },
    };
    this.registerEvent('getbyid', getHandler);
  }
}
