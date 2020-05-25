/*
 * logs the user in and returns the user
 */

const login = async (_, { password }) => {
    const { keystone } = require("../index.js");

    const result = await keystone.executeQuery(`
        query {
            allUsers(where:{password:"${password}"}) {
                company, disabled
            }
        }
    `);

    //Checks to see if any users with the same password was returned
    if (result.data.allUsers.length === 0) {
        //Future: Add Event
        throw new Error("Incorrect password was given.");
    }

    //Checks to see if the user account is disabled
    if(result.data.allUsers[0].disabled){
        //Future: Add Event
        throw new Error("User account disabled."); 
    }

    //Future: Add Event

    return result.data.allUsers[0];
};

module.exports = login;
