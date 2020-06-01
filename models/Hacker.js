const { Text, DateTime, Select, Relationship, Integer, Checkbox, Url } = require("@keystonejs/fields");

const Event = {
    fields: {
        parent: {
            type: Relationship,
            ref: "Year",
        },
        name: { type: Text },
        email: { type: Text },
        school: { type: Text },
        birthday: { type: DateTime },
        gender: {
            type: Select,
            dataType: 'string',
            options: "Male, Female, Non-binary, Prefer not to answer"
        },
        race: { 
            type: Select,
            dataType: 'string',
            options: "White/Caucasian, Asian/Pacific Islander, Hispanic, Black or African American, " +
            "American Indian or Alaskan Native, Prefer not to answer",
        },
        levelOfStudy: {
            type: Select,
            dataType: 'string',
            options: "High School, Tech School, Undergraduate University, Graduate University",
        },
        graduation: { type: DateTime },
        major: { type: Text },
        hackathons: { type: Integer },
        diet: { 
            type: Select,
            dataType: 'string',
            options: "Vegetarian, Vegan, Lactose, Gluten, Nut Allergy, Halal, Kosher, Other",
            many: true,
        },
        shirt: {
            type: Select,
            dataType: 'string',
            options: "X-Small, Small, Medium, Large, X-Large, XX-Large",
        },
        needsReimbursement: { type: Checkbox },
        github: { type: Url },
        website: { type: Url }
    },
    labelField: "name",
};

module.exports = Event;