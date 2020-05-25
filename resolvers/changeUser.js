/*
 * Updates the user based on values given. ID is only required argument.
 */

const changeUser = async (_, { id, company, password, disabled }) => {
    const { keystone } = require("../index.js");

    //Checks to see if any of the variables were given
    if (!company && !password && disabled === null) {
        //Future: Add Event and Exception

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
                    company
                }
            }
        `);

        //Check to see if any companies were returned from the query
        if (check.data.allUsers.length > 0) {
            //Future: Add Event and Exception

            return null;
        }

        //Set the new company to the given company
        newCompany = company;
    }

    //Check to see if the password was given
    if (!password) {
        //Set the newPassword variable to the old password
        newPassword = companyData.data.allUsers[0].password;
    } else {
        //Check to see if the new password is different from the old one
        if (password === companyData.data.allUsers[0].password) {
            //Future: Add Event and Exception

            return null;
        }

        //looks to see if the password is already being used
        const check = await keystone.executeQuery(`
            query {
                allUsers(where:{password: "${password}"}) {
                    password
                }
            }
        `);

        //Check to see if any companies were returned from the query
        if (check.data.allUsers.length > 0) {
            //Future: Add Event and Exception

            return null;
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
