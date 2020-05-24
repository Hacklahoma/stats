/**
 * Creates a new password with the company name and a unique password
 */

const addUser = async (_, { company, password }) => {
    const { keystone } = require("../index.js");

    // Create page
    const result = await keystone.executeQuery(`
        mutation {
            createUser(data:{
                company: "${company}",
                password: "${password}",
                disabled: false,
                isAdmin: false,
            }) {
                company
            }
        }
    `);
    return result.data.createUser;
};

module.exports = addUser;
