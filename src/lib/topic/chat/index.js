import BaseTopic from '../base';
import sendHandler from './handler/sendMessage';
import getHandler from './handler/getConversation';

export default class ChatTopic extends BaseTopic {
  constructor() {
    super();
    this.chats = {};
    this.registerEvent('sendmessage', sendHandler);
    this.registerEvent('getconversation', getHandler);
  }
}
