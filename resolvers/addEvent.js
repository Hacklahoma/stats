/*
 * Create an event based off of a user's token, the type of event, and a description
 */

const addEvent = async (_, { token, type, description }) => {
    const { keystone } = require("../index.js");

    //Check to make sure the year isn't already being used
    const user = await keystone.executeQuery(`
        query {
            allUsers(where:{token:"${token}"}) {
                id 
                company
                token
            }
        }
    `);

    //Check to see if any years were returned from query
    if(user.data.allUsers.length === 0){
        throw new Error("User not found.");
    }

    //Create the event with the description
    const event = await keystone.executeQuery(`
        mutation {
            createEvent(
                data:{
                    parent: {connect: {id: ${user.data.allUsers[0].id}}}, 
                    type: ${type},
                    ${description ? `description: "${description}",` : ``}
                    timestamp: "${(new Date()).toISOString()}",
                }
            ){
                id
                parent { id company }
                type 
                description
                timestamp
            }
        }
    `);

    //Update the user to include the new event
    const updatedUser = await keystone.executeQuery(`
        mutation {
            updateUser(
                id: ${user.data.allUsers[0].id},
                data: {
                    activity: {connect: {id: ${event.data.createEvent.id}}},
                }
            ){
                id
                activity { description }
            }
        }
    `);

    return event.data.createEvent;
}

module.exports = addEvent;
