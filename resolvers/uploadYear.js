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
            d[2] = (d[2] < 80) ? '20' + d[2] : '19' + d[2];
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

const uploadYear = async (_, { year, projects, data }) => {
    const { keystone } = require("../index.js");
    const { parse } = require("papaparse")

    //Check to make sure the year isn't already being used
    const yearCheck = await keystone.executeQuery(`
            query {
                allYears(where:{year:${year}}) {
                    year
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
                        year: ${year},
                    }) {
                        id ,year
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

        var gender_F = 0, 
            gender_M = 0,
            gender_NB = 0,
            gender_N = 0,
            race_WC = 0,
            race_API = 0,
            race_H = 0,
            race_BAA = 0,
            race_AIAN = 0,
            race_N = 0,
            levelOfStudy_HS = 0,
            levelOfStudy_TS = 0,
            levelOfStudy_UU = 0,
            levelOfStudy_GU = 0,
            levelOfStudy_N = 0,
            diet_VT = 0,
            diet_VE = 0,
            diet_L = 0,
            diet_G = 0,
            diet_NA = 0,
            diet_H = 0,
            diet_K = 0,
            diet_O = 0,
            diet_N = 0,
            shirt_XS = 0,
            shirt_S = 0,
            shirt_M = 0,
            shirt_L = 0,
            shirt_XL = 0,
            shirt_XXL = 0;


    //Go through the hacker data and parse it all
    const hackerIDs = [];
    for (i in hackerData.data){
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
                        parent {year}
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

        // Checks for errors within parsing process
        if(hacker.errors) {
            // Remove hackers
            await keystone.executeQuery(`
                mutation {
                    deleteHackers(
                        ids: ${JSON.stringify(hackerIDs)}, 
                    ){
                        id
                    }
                }
            `);

            // Remove year
            await keystone.executeQuery(`
                mutation {
                    deleteYear(
                        id: ${yearData.data.createYear.id}, 
                    ){
                        id
                    }
                }
            `);            

            // Throw error
            throw new Error(`${hacker.errors[0].message} at line ${+i + +2}.`);
        }

        //Switch statement for gender
        switch (hackerData.data[i].gender) {
            case "Male":
                gender_M++;
                break;
            case "Female":
                gender_F++;
                break;
            case "Non-binary":
                gender_NB++;
                break;
            default:
                gender_N++;
        }

        //Switch statement for races
        switch (hackerData.data[i].race) {
            case "White/Caucasian":
                race_WC++;
                break;
            case "Asian/Pacific Islander":
                race_API++;
                break;
            case "Hispanic":
                race_H++;
                break;
            case "Black or African American":
                race_BAA++;
                break;
            case "American Indian or Alaskan Native":
                race_AIAN++;
                break;
            default:
                race_N++;
        }

        //Switch statement for level of study
        switch (hackerData.data[i].levelOfStudy) {
            case "High School":  
                levelOfStudy_HS++;
                break;
            case "Tech School":
                levelOfStudy_TS++;
                break;
            case "Undergraduate University":
                levelOfStudy_UU++;
                break;
            case "Graduate University":
                levelOfStudy_GU++;
                break;
            default:
                levelOfStudy_N++;
        }

        //Switch statement for diet
        switch (hackerData.data[i].diet) {
            case "Vegetarian":
                diet_VT++;
                break;
            case "Vegan":
                diet_VE++;
                break;
            case "Lactose":
                diet_L++;
                break;
            case "Gluten":
                diet_G++;
                break;
            case "Nut Allergy":
                diet_NA++;
                break;
            case "Halal":
                diet_H++;
                break;
            case "Kosher":
                diet_K++;
                break;
            case "Other":
                diet_O++;
                break;
            default:
                diet_N++;
        }

        //Switch statement for shirt size
        switch (hackerData.data[i].shirt) {
            case "XS":
                shirt_XS++;
                break;
            case "S":
                shirt_S++;
                break;
            case "M":
                shirt_M++;
                break;
            case "L":
                shirt_L++;
                break;
            case "XL":
                shirt_XL++;
                break;
            case "XXL":
                shirt_XXL++;
        }
        
        // Pushing hacker ids to array in case we need to remove them
        hackerIDs.push(hacker.data.createHacker.id);

        //Add the hacker to the year
        await keystone.executeQuery(`
                mutation {
                    updateYear(
                        id: ${yearData.data.createYear.id}, 
                        data:{
                            hackers: {connect:{id:"${hacker.data.createHacker.id}"}}
                        }
                    ){
                        year
                        hackers {name}
                    }
                }
            `);
    }

    const test = await keystone.executeQuery(`
        mutation {
            updateYear(
                id: ${yearData.data.createYear.id},
                data: {
                    metrics: {
                        create: {
                            hackers: ${hackerData.data.length},
                            projects: ${projects},
                            majors: "Test",
                            gender_F: ${gender_F}, 
                            gender_M: ${gender_M},
                            gender_NB: ${gender_NB},
                            gender_N: ${gender_N},
                            race_WC: ${race_WC},
                            race_API: ${race_API},
                            race_H: ${race_H},
                            race_BAA: ${race_BAA},
                            race_AIAN: ${race_AIAN},
                            race_N: ${race_N},
                            levelOfStudy_HS: ${levelOfStudy_HS},
                            levelOfStudy_TS: ${levelOfStudy_TS},
                            levelOfStudy_UU: ${levelOfStudy_UU},
                            levelOfStudy_GU: ${levelOfStudy_GU},
                            levelOfStudy_N: ${levelOfStudy_N},
                            diet_VT: ${diet_VT},
                            diet_VE: ${diet_VE},
                            diet_L: ${diet_L},
                            diet_G: ${diet_G},
                            diet_NA: ${diet_NA},
                            diet_H: ${diet_H},
                            diet_K: ${diet_K},
                            diet_O: ${diet_O},
                            diet_N: ${diet_N},
                            shirt_XS: ${shirt_XS},
                            shirt_S: ${shirt_S},
                            shirt_M: ${shirt_M},
                            shirt_L: ${shirt_L},
                            shirt_XL: ${shirt_XL},
                            shirt_XXL: ${shirt_XXL},
                        }
                    }
                }
            ){
                year
                metrics { hackers
                    projects
                    majors
                    gender_F 
                    gender_M
                    gender_NB
                    gender_N
                    race_WC
                    race_API
                    race_H
                    race_BAA
                    race_AIAN
                    race_N
                    levelOfStudy_HS
                    levelOfStudy_TS
                    levelOfStudy_UU
                    levelOfStudy_GU
                    levelOfStudy_N
                    diet_VT
                    diet_VE
                    diet_L
                    diet_G
                    diet_NA
                    diet_H
                    diet_K
                    diet_O
                    diet_N
                    shirt_XS
                    shirt_S
                    shirt_M
                    shirt_L
                    shirt_XL
                    shirt_XXL
                }
            }
        }
    `)

    return yearData.data.createYear;
}

module.exports = uploadYear;
