/*
 * Create an event based off of a user's id, the type of event, and a description
 */

const addEvent = async (_, { id, type, description }) => {
    const { keystone } = require("../index.js");

    // Get date in CST
    const date = new Date();
    const convertedDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000).toISOString();

    //Update the user to include the new event
    const user = await keystone.executeQuery(`
        mutation {
            updateUser(
                id: ${id},
                data: {
                    activity: {
                        create: {
                            parent: {connect: {id: ${id}}}, 
                            type: ${type},
                            ${description ? `description: "${description}",` : ``}
                            timestamp: "${convertedDate}",
                        }
                    },
                }
            ){
                id
                activity { description }
            }
        }
    `);
    
    return user.data.updateUser;
};

module.exports = addEvent;
