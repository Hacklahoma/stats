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
    labelField: "label",
};

module.exports = Year;