const BaseTopic = require('../base');
const sendHandler = require('./handler/sendMessage');
const getHandler = require('./handler/getConversation');

module.exports = class ChatTopic extends BaseTopic {
  constructor() {
    super();
    this.chats = {};
    this.registerEvent('sendmessage', sendHandler);
    this.registerEvent('getconversation', getHandler);
  }
};
