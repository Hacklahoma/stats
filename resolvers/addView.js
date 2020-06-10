/**
 * Takes in an id and adds the view event to the company
 */


const addView = async (_, { id }) => {
    const { keystone } = require("../index.js");

    //Create the view from the user's id
    const event = await keystone.executeQuery(`
        mutation {
            createEvent(
                data:{
                    parent: {connect: {id: ${id}}}, 
                    type: VIEW,
                    description: "Company View",
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
                id: ${id},
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

module.exports = addView;