/**
 * Event dispatcher responsible for delegating events to particular topics
 *
 * @type {}
 */
import BaseTopic from '../topic/base';

// TODO refactor this to a class or separate functions into separate functions
export default {
  topics: {},
  registerTopic: function registerTopic(topicName, topicObject, cb) {
    const callback = cb || function noop() {};
    if (!(topicObject instanceof BaseTopic)) {
      return callback(new Error(`Topic being registered as ${topicName} is not a topic`));
    }

    this.topics[topicName] = topicObject;

    return callback(undefined, this.topics);
  },
  dispatch: function dispatch(dispatchString, data, cb) {
    const callback = cb || function noop() {};
    const pieces = dispatchString.split('.');
    if (!this.topics[pieces[0]]) {
      return callback(new Error(`${this.topics[pieces[0]]} is not registered in dispatcher`));
    }

    return this.topics[pieces[0]].execute(pieces[1], data, callback);
  },
};
