module.exports = function getById(data, cb) {
  return cb(
    undefined,
    { responseType: 'user', data: this.users[data.userId] } || { responseType: 'user', data: {} }
  );
};
