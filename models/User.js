const { Text, Password, Checkbox, Integer, Relationship } = require("@keystonejs/fields");

const User = {
    fields: {
        company: { type: Text },
        password: { type: Password },
        disabled: { type: Checkbox, isRequired: true },
        views: { type: Integer, defaultValue: 0 },
        activity: { 
            type: Relationship,
            ref: "Event",
        },
        isAdmin: { type: Checkbox, isRequired: true },
    },
};

module.exports = User;