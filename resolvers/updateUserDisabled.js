/*
 * Updates if the user is disabled or enabled based on previous boolean value
 */

const updateUserDisabled = async (_, { company }) => {
    const { keystone } = require("../index.js");

    //Get the company's Data first
    const companyData = await keystone.executeQuery(`
        query {
            allUsers(where:{company: "${company}"}) {
                id, disabled
            }
        }
    `);
    
    //Check to see if the company does exist
    if(companyData.data.allUsers.length === 0){
        //Future: Add Event

        return null;
    }

    //Update if the user is disabled or enabled
    const result = await keystone.executeQuery(`
        mutation {
            updateUser(
                id: ${companyData.data.allUsers[0].id}, 
                data:{
                    disabled: ${!companyData.data.allUsers[0].disabled}
                }
            ){
                company, disabled
            }
        }
    `);

    //Future: Add Event

    return result.data.updateUser;
};

module.exports = updateUserDisabled;