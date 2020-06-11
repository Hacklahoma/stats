/**
 * Resolver that retrieves all views from a user.
 * Returns an array of events.
 */

const retrieveViews = async (_, { id }) => {
    const { keystone } = require("../index.js");

    //Retrieve the views from a company
    const views = await keystone.executeQuery(`
        query {
            allEvents (
                where: {
                    parent: { id: ${id} },
                    type: VIEW
                }
            ){
                id
                parent { company } 
                type
            }
        }
    `);

    return views.data.allEvents;
};

module.exports = retrieveViews;

