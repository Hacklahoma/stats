const { Select, Text, Relationship, Integer } = require("@keystonejs/fields");

const Major = {
    fields: {
        type: { 
            type: Select,
            dataType: 'string',
            options: "Arts and Humanities, Business, Health and Medicine, " +
            "Multi/Interdisciplinary Studies, Public and Social Services, " +
            "STEM, Computer Science & Software Engineering, Social Sciences, " +
            "Trades and Personal Services"
        },
        raw: { type: Text, many: true },
        quantity: { type: Integer },
        parent: {
            type: Relationship,
            ref: "Metric"
        }
    },
};

module.exports = Major;