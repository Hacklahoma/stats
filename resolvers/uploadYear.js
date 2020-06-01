/*
 * Creates a new year with all of the hacker data
 */

const uploadYear = async (_, { year, data }) => {
    const { keystone } = require("../index.js");
    const { parse } = require("papaparse")

    //Check to make sure the year isn't already being used
    const yearCheck = await keystone.executeQuery(`
            query {
                allYears(where:{label:"${year}"}) {
                    label
                }
            }
        `);

    //Check to see if any years were returned from query
    if(yearCheck.data.allYears.length > 0){
        throw new Error("Year is currently already being used.")
    }


    parse(data , {
        step: function(row) {
            console.log("Row:", row.data);
        },
        complete: function() {
            console.log("All done!");
        },
        header: true,
    })
    
    return null;
}

module.exports = uploadYear;
