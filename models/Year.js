const { Text, Relationship } = require("@keystonejs/fields");

const Year = {
    fields: {
        label: { type: Text },
        hackers: {
            type: Relationship,
            ref: "Hacker",
            many: true,
        },
    },
};

module.exports = Year;