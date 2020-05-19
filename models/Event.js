const { Text, Select, DateTime, Relationship } = require("@keystonejs/fields");

const Event = {
    fields: {
        parent: {
            type: Relationship,
            ref: "User",
        },
        type: {
            type: Select,
            options: "LOGIN, LOGOUT, DISABLE_COMPANY, ENABLE_COMPANY" +
            ", ENABLE_YEAR, CREATE_COMPANY, CREATE_YEAR, UPLOAD_YEAR"
        },
        description: { type: Text },
        timestamp: { type: DateTime }, 
    },
};

module.exports = Event;