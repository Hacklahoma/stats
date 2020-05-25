const { Text, Checkbox, Relationship, Uuid } = require("@keystonejs/fields");

const User = {
    fields: {
        token: { type: Uuid, isUnique: true },
        company: { type: Text },
        password: { type: Text },
        disabled: { type: Checkbox, isRequired: false },
        activity: { 
            type: Relationship,
            ref: "Event",
        },
        isAdmin: { type: Checkbox, isRequired: false },
    },
};

module.exports = User;
