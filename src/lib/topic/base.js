export default class BaseTopic {
  constructor() {
    this.eventHandlers = {};
  }

  execute(event, data, cb) {
    const callback = cb || function noop() {};
    if (!this.eventHandlers[event]) {
      return callback(new Error(`Event ${event} not registered on topic`));
    }

    return this.eventHandlers[event].call(this, data, callback);
  }

  registerEvent(event, handler) {
    this.eventHandlers[event] = handler;
  }
}
