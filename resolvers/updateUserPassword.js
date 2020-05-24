/**
 * Updates User based off of company name and a new password
 */

const updateUserPassword = async (_, { company, password }) => {
    const { keystone } = require("../index.js");

    //Get the company's ID first
    const companyID = await keystone.executeQuery(`
        query {
            allUsers(where:{company: "${company}"}) {
                company, password, id
            }
        }
    `);

    //Check to see if the company does exist
    if(companyID.data.allUsers.length === 0){
        //Future: Add Event

        return null;
    }

    //Check to see if the new password is different from the old one
    if(password === companyID.data.allUsers[0].password){
        //Future: Add Event

        return null;
    }  


    //Check to see if the new password is unique
    const passwordCheck = await keystone.executeQuery(`
        query {
            allUsers(where:{password: "${password}"}) {
                password
            }
        }
    `);
    
    //Logic to see if anything was pulled from the passwordCheck
    if(passwordCheck.data.allUsers.length > 0) {
        //Future: Add Event

        return null;
    }

    //Update the password
    const result = await keystone.executeQuery(`
        mutation {
            updateUser(
                id: ${companyID.data.allUsers[0].id}, 
                data:{
                    password: "${password}",
                }
            ){
                company, password
            }
        }
    `);

    //Future: Add Event

    return result.data.updateUser;
};

module.exports = updateUserPassword;