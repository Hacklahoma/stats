// eslint-disable-next-line import/no-extraneous-dependencies
const { Text, Checkbox, Relationship, Uuid } = require('@keystonejs/fields');
const { v4: uuidv4 } = require('uuid');

const User = {
  fields: {
    company:  { type: Text },
    password: { type: Text },
    isAdmin:  { type: Checkbox, defaultValue: false },
    disabled: { type: Checkbox, defaultValue: false },
    activity: { type: Relationship, ref: 'Event', many: true },
    token:    {
      type:         Uuid,
      isUnique:     true,
      defaultValue: () => uuidv4(),
    },
  },
  labelField: 'company',
};

module.exports = User;
