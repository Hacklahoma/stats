// eslint-disable-next-line import/no-extraneous-dependencies
const { Text, Select, DateTime, Relationship } = require('@keystonejs/fields');

const Event = {
  fields: {
    parent: {
      type: Relationship,
      ref: 'User',
    },
    type: {
      type: Select,
      options:
        'LOGIN, LOGOUT, DISABLE_COMPANY, ENABLE_COMPANY, DISABLE_YEAR, ENABLE_YEAR, CREATE_COMPANY, UPLOAD_YEAR, VIEW',
    },
    description: { type: Text },
    timestamp: { type: DateTime },
  },
};

module.exports = Event;
