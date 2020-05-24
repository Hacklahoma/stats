/**
 * Creates a new password with the company name and a password
 */

const addUser = async (_, { company, password }) => {
    const { keystone } = require("../index.js");

    //Check to see if the company name was already used
    const companyCheck = await keystone.executeQuery(`
            query {
                allUsers(where:{company:"${company}"}) {
                    company
                }
            }
        `);
    //Checks to see if any users with the same company name was returned
    if(companyCheck.data.allUsers.length > 0){
        return null;
    }

    //Check to see if the password was already used
    const passwordCheck = await keystone.executeQuery(`
        query {
            allUsers(where:{password:"${password}"}) {
                company
            }
        }
    `);

    //Checks to see if any users with the same password was returned
    if(passwordCheck.data.allUsers.length > 0){
        return null;
    }

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
