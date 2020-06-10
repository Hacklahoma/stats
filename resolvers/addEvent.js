/*
 * Create an event based off of a user's id, the type of event, and a description
 */

const addEvent = async (_, { id, type, description }) => {
    const { keystone } = require("../index.js");

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
                            timestamp: "${new Date().toISOString("en-US", {
                                timeZone: "America/Chicago",
                            })}",
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
