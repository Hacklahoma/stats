/*
 * Updates the user based on values given. ID is only required argument.
 */

const changeUser = async (_, { id, company, password, disabled }) => {
    const { keystone } = require("../index.js");

    //Checks to see if any of the variables were given
    if (!company && !password && disabled === null) {
        //Future: Add Event and Exception
        console.log("variables were not given");

        return null;
    }

    //Grab the company's data
    const companyData = await keystone.executeQuery(`
        query {
            allUsers(where:{id: ${id}}) {
                company, password, disabled
            }
        }
    `);

    //Check to see if the company exist at the id
    if (companyData.data.allUsers.length === 0) {
        //Future: Add Event and Exception
         console.log("There does not exist an id");

        return null;
    }

    //Set up some variables to store new values into
    var newCompany, newPassword, newDisabled;

    //Check to see if the company was given
    if (!company) {
        //Set the newCompany variable to the old company
        newCompany = companyData.data.allUsers[0].company;
    } else {
        //looks to see if the company's name is already being used
        const check = await keystone.executeQuery(`
            query {
                allUsers(where:{company: "${company}"}) {
                    id
                    company
                }
            }
        `);

        //Check to see if any companies were returned from the query and not the
        //same company
        if (check.data.allUsers.length > 0) {
            if (check.data.allUsers[0].id !== id) {
                //Future: Add Event and Exception
                console.log("duplicate company");
                
                return null;
            }
        }

        //Set the new company to the given company
        newCompany = company;
    }

    //Check to see if the password was given
    if (!password) {
        //Set the newPassword variable to the old password
        newPassword = companyData.data.allUsers[0].password;
    } else {
        //looks to see if the password is already being used
        const check = await keystone.executeQuery(`
            query {
                allUsers(where:{password: "${password}"}) {
                    id
                    password
                }
            }
        `);

        //Check to see if any companies were returned from the query and not the
        //same company
        if (check.data.allUsers.length > 0) {
            if (check.data.allUsers[0].id !== id) {
                //Future: Add Event and Exception
                console.log("duplicate password");

                return null;
            }
        }

        //Set the new password to the given password
        newPassword = password;
    }

    //Checks to see if disabled was given
    if (disabled === null) {
        //Set the newDisabled variable to the old disabled
        newDisabled = companyData.data.allUsers[0].disabled;
    } else {
        //Set the new disabled to the given disabled
        newDisabled = disabled;
    }

    console.log(`
    mutation {
            updateUser(
                id: ${id}, 
                data:{
                    ${newCompany !== undefined ? `company: "${newCompany}",` : ``}
                    ${newPassword !== undefined ? `password: "${newPassword}",` : ``}
                    ${newDisabled !== undefined ? `disabled: ${newDisabled},` : ``}
                }
            ){
               id 
               company
               password 
               disabled
            }
        }
    );`);

    //Update the data
    const result = await keystone.executeQuery(`
        mutation {
            updateUser(
                id: ${id}, 
                data:{
                    ${newCompany !== undefined ? `company: "${newCompany}",` : ``}
                    ${newPassword !== undefined ? `password: "${newPassword}",` : ``}
                    ${newDisabled !== undefined ? `disabled: ${newDisabled},` : ``}
                }
            ){
               id 
               company
               password 
               disabled
            }
        }
    `);

    //Future: Add Event and Exceptions

    return result.data.updateUser;
};

module.exports = changeUser;
