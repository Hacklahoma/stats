/*
 * logs the user in and returns the user
 */

const login = async (_, { password, code }) => {

    //First check to ensure a password or login code was given
    if(!password && !code){
        throw new Error("Login Failed.");
    }

    const { keystone } = require("../index.js");

    //Checks to see if the password was given
    if(password){
        const result = await keystone.executeQuery(`
            query {
                allUsers(where:{password:"${password}"}) {
                    id
                    token
                    company
                    disabled
                    isAdmin
                }
            }
        `);

        //Checks to see if any users with the same password was returned
        if (result.data.allUsers.length === 0 || password === "") {
            //Future: Add Event
            throw new Error("Incorrect password was given.");
        }

        //Checks to see if the user account is disabled
        if (result.data.allUsers[0].disabled) {
            //Future: Add Event
            throw new Error("User account disabled.");
        }

        //Future: Add Event

        return result.data.allUsers[0];
    }



    //Checks to see if code is given
    if(code !== null){
        const fetch = require('node-fetch');

        let url = `https://slack.com/api/oauth.access?code=${code}&client_id=${process.env.SLACK_CLIENT_ID}&client_secret=${process.env.SLACK_CLIENT_SECRET}`
        let settings = { method: "Get" };

        //Fetch the json file
        const user = 
            await fetch(url, settings)
                .then((res) => res.json())
                .then((json) => {
                    //checks to see if the data was able to be pulled
                    if (json.ok === false) {
                        throw new Error("Could not log in through Slack.");
                    } else {
                        if (json.team.id !== process.env.SLACK_TEAM_ID) {
                            throw new Error("Wrong Slack team entered.");
                        }
                        return json.user.name;
                    }
                });

        //Sees if the hacklahoma user's account is already created
        const hacklahomaAccount = await keystone.executeQuery(`
            query {
                allUsers(where:{company: "${user}"}) {
                    id
                    token
                    company
                    disabled
                    isAdmin
                }
            }
        `);

        //Creates a new hacklahoma Account if none was given
        if (hacklahomaAccount.data.allUsers.length === 0) {
            //Future: Add Event

            const result = await keystone.executeQuery(`
                mutation {
                    createUser(data:{
                        company: "${user}",
                        password: "",
                        isAdmin: true, 
                    }) {
                        id, token, company, password, isAdmin
                    }
                }
            `);

            return result.data.createUser;
        }
        else {
            return hacklahomaAccount.data.allUsers[0];
        }
    }
};

module.exports = login;
