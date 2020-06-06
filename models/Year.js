const { Relationship, Checkbox } = require("@keystonejs/fields");

const Year = {
    fields: {
        year: { type: String, isUnique: true },
        hackers: {
            type: Relationship,
            ref: "Hacker",
            many: true,
        },
        disabled: { type: Checkbox, defaultValue: false },
    },
    labelField: "label",
};

module.exports = Year;