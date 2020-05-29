/*
 * logs the user in through slack and returns the hacklahoma user.
 */

const login = async (_, { code }) => {
    const { keystone } = require("../index.js");

    const hacklahomaUser = await keystone.executeQuery(`
        query {
            allUsers(where:{company:"Hacklahoma"}) {
                id
                token
                company
                disabled
                isAdmin
            }
        }
    `);

    //Checks to Hacklahoma User was found
    if (hacklahomaUser.data.allUsers.length === 0) {
        //Create the hacklahoma user
    }

    //Checks to see if the user account is disabled
    if (hacklahomaUser.data.allUsers[0].disabled) {
        //Future: Add Event
        throw new Error("User account disabled.");
    }

    //Future: Add Event

    return hacklahomaUser.data.allUsers[0];
};

module.exports = login;
