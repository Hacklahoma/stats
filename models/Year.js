const { Relationship, Checkbox, Integer } = require("@keystonejs/fields");

const Year = {
    fields: {
        year: { type: Integer, isUnique: true },
        hackers: {
            type: Relationship,
            ref: "Hacker",
            many: true,
        },
        metrics: { 
            type: Relationship,
            ref: "Metric",
        },
        disabled: { type: Checkbox, defaultValue: false },
    },
    labelField: "label",
};

module.exports = Year;