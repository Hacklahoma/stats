const { Text, Checkbox, Relationship, Uuid } = require("@keystonejs/fields");
const { v4: uuidv4 } = require("uuid");

const User = {
    fields: {
        token: {
            type: Uuid,
            isUnique: true,
            defaultValue: ({ context, originalInput, actions }) => {
                return uuidv4();
            },
        },
        company: { type: Text },
        password: { type: Text },
        disabled: { type: Checkbox, defaultValue: false },
        activity: { type: Relationship, ref: "Event", many: true },
        isAdmin: { type: Checkbox, defaultValue: false },
    },
    labelField: "company",
};

module.exports = User;
