/**
 * Takes in an id and adds the view event to the company
 */

const addView = async (_, { id }) => {
    const { keystone } = require("../index.js");
 
    //Create the view from the user's id
    const event = await keystone.executeQuery(`
        mutation {
            updateUser(
                id: ${id},
                data: {
                    activity: {
                        create: {
                            parent: {connect: {id: ${id}}},
                            type: VIEW,
                            description: "Company View",
                            timestamp: "${new Date().toISOString()}"
                        }
                    }
                }
            ) {
                id
                activity {
                    id
                }
            }
        }
    `);

    return event.data.updateUser;
};

module.exports = addView;
