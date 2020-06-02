/*
 * Creates a new year with all of the hacker data
 */

const uploadYear = async (_, { year, data }) => {
    const { keystone } = require("../index.js");
    const { parse } = require("papaparse")

    console.log("1");
    //Check to make sure the year isn't already being used
    const yearCheck = await keystone.executeQuery(`
            query {
                allYears(where:{label:"${year}"}) {
                    label
                }
            }
        `);

    console.log("2");
    //Check to see if any years were returned from query
    if(yearCheck.data.allYears.length > 0){
        throw new Error("Year is currently already being used.")
    }
    
    console.log("3");
    //Create the initial year
    const yearData = await keystone.executeQuery(`
                mutation {
                    createYear(data:{
                        label: "${year}",
                    }) {
                        id ,label
                    }
                }
            `);

    console.log("4");
    //Parse the data
    const hackerData = parse(data , {
        complete: function(results, file) {
            return results;
        },
        header: true,
    })

    console.log("5");
    //Empty Hacker Array
    var hackers = new Array();

    //Go through the hacker data and parse it all
    for (i in hackerData.data){
        //parent: ${yearData.data.createYear},

        const hacker = await keystone.executeQuery(`
                mutation {
                    createHacker(data:{
                        name: ${hackerData.data[i].name},
                        email: ${hackerData.data[i].email},
                        school: ${hackerData.data[i].school},
                        birthday: ${hackerData.data[i].birthday},
                        gender: ${hackerData.data[i].gender},
                        race: ${hackerData.data[i].race},
                        levelOfStudy: ${hackerData.data[i].levelOfStudy},
                        graduation: ${hackerData.data[i].graduation},
                        major: ${hackerData.data[i].major},
                        hackathons: ${hackerData.data[i].hackathons},
                        diet: ${hackerData.data[i].diet},
                        shirt: ${hackerData.data[i].shirt},
                        needsReimbursement: false,
                        github: ${hackerData.data[i].github},
                        website: ${hackerData.data[i].website},
                    }) {
                        name, email, school, birthday, gender, race, levelOfStudy,
                        graduation, major, hackathons, diet, shirt, needReimbursement,
                        github, website
                    }
                }
            `);

        hackers.push(hacker.data.createHacker);
    }
    console.log("6");

    console.log(hackers);
    console.log(yearData.data.createYear.id);

    const result = await keystone.executeQuery(`
                mutation {
                    updateYear(
                        id: ${yearData.data.createYear.id}, 
                        data:{
                            hackers: ${hackers}
                    }) {
                        name
                    }
                }
            `);

            console.log("7");
    return result.data.updateYear;
}

module.exports = uploadYear;
