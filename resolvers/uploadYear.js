/*
 * Creates a new year with all of the hacker data
 */

//Function to convert date from dd/mm/yy to yyyy-mm-dd (ISO 8601)
function convertDate(date){
    var d = date.split("/");

    //Checks to ensure that the date is the correct length
    if(d.length === 3){
        //Fix the month
        if(d[0].length !== 2){
            d[0] = "0" + d[0];
        }
        //Fix the day
        if(d[1].length !== 2){
            d[1] = "0" + d[1];
        }
        //Fix the year
        if(d[2].length !== 4){
            d[2] = (d[2] < 90) ? '20' + d[2] : '19' + d[2];
        }

        //Return the compatible date
        return d[2] + "-" + d[0] + "-" + d[1];
    }
    //Graduation Dates
    else if(d.length === 1){
        return date + "-05"
    }

    //If it manages to get down here return null
    return null;
}

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

    //Parse the data
    const hackerData = parse(data , {
        complete: function(results, file) {
            return results;
        },
        header: true,
    })

    //Go through the hacker data and parse it all
    for (i in hackerData.data){
        //Check the name
        if(hackerData.data[i].name.includes(`"`)){
            throw new Error(`Incorrectly formated name at line ${+i+ +2}.`)
        }

        //Create a new hacker
        const hacker = await keystone.executeQuery(`
                mutation {
                    createHacker(data:{
                        parent: {connect: {id: ${yearData.data.createYear.id}}}
                        ${hackerData.data[i].name.length > 0 ? `name: "${hackerData.data[i].name}",` : ``}
                        ${hackerData.data[i].email.length > 0 ? `email: "${hackerData.data[i].email}",` : ``}
                        ${hackerData.data[i].school.length > 0 ? `school: "${hackerData.data[i].school}",` : ``}
                        ${hackerData.data[i].birthday.length > 0 ? `birthday: "${convertDate(hackerData.data[i].birthday)}",` : ``}
                        ${hackerData.data[i].gender.length > 0 ? `gender: "${hackerData.data[i].gender}",` : ``}
                        ${hackerData.data[i].race.length > 0 ? `race: "${hackerData.data[i].race}",` : ``}
                        ${hackerData.data[i].levelOfStudy.length > 0 ? `levelOfStudy: "${hackerData.data[i].levelOfStudy}",` : ``}
                        ${hackerData.data[i].graduation.length > 0 ? `graduation: "${convertDate(hackerData.data[i].graduation)}",` : ``} 
                        ${hackerData.data[i].major.length > 0 ? `major: "${hackerData.data[i].major}",` : ``} 
                        ${hackerData.data[i].hackathons.length > 0 ? `hackathons: ${hackerData.data[i].hackathons},` : ``} 
                        ${hackerData.data[i].diet.length > 0 ? `diet: "${hackerData.data[i].diet}",` : ``} 
                        ${hackerData.data[i].shirt.length > 0 ? `shirt: "${hackerData.data[i].shirt}",` : ``} 
                        needsReimbursement: false,
                        ${hackerData.data[i].github.length > 0 ? `github: "${hackerData.data[i].github}",` : ``} 
                        ${hackerData.data[i].website.length > 0 ? `website: "${hackerData.data[i].website}",` : ``} 
                    }) {
                        id
                        parent {label}
                        name
                        email
                        school
                        birthday
                        gender
                        race
                        levelOfStudy
                        graduation
                        major
                        hackathons
                        diet
                        shirt
                        needsReimbursement
                        github
                        website
                    }
                }
            `);
        
        //Add the hacker to the year
        const addHacker = await keystone.executeQuery(`
                mutation {
                    updateYear(
                        id: ${yearData.data.createYear.id}, 
                        data:{
                            hackers: {connect:{id:"${hacker.data.createHacker.id}"}}
                        }
                    ){
                        label
                        hackers {name}
                    }
                }
            `);
    }

    return yearData.data.createYear;
}

module.exports = uploadYear;
