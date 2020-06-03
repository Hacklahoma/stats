const { Integer, Relationship } = require("@keystonejs/fields");

const Year = {
    fields: {
        year: { type: Integer, isUnique: true },
        hackers: {
            type: Relationship,
            ref: "Hacker",
            many: true,
        },
    },
    labelField: "label",
};

module.exports = Year;