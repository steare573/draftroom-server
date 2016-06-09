const BaseTopic = require('../base');
const getHandler = require('./handler/getById');

module.exports = class ChatTopic extends BaseTopic {
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
};
