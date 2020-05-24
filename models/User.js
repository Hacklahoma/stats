const { Text, Password, Checkbox, Integer, Relationship } = require("@keystonejs/fields");

const User = {
    fields: {
        company: { type: Text },
        password: { type: Text },
        disabled: { type: Checkbox, isRequired: false },
        views: { type: Integer, defaultValue: 0 },
        activity: { 
            type: Relationship,
            ref: "Event",
        },
        isAdmin: { type: Checkbox, isRequired: false },
    },
};

module.exports = User;
