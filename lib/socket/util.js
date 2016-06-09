const parsePayload = payload => {
  if (!payload || !payload.data || !Array.isArray(payload.data)) {
    return {};
  }

  return {
    event: payload.data[0],
    data: payload.data[1],
    callback: payload.data[2] || function noop() {},
  };
};

module.exports = {
  parsePayload,
};
