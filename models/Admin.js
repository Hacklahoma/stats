const { Text, Password } = require("@keystonejs/fields");

const Admin = {
    fields: {
        username: { type: Text },
        password: { type: Password },
    },
};

module.exports = Admin;
