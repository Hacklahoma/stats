const { Relationship, Integer } = require("@keystonejs/fields");

const Metric = {
    fields: {
        parent: {
            type: Relationship,
            ref: "Year"
        },
        hackers: {type: Integer},
        projects: {type: Integer},
        majors: {
            type: Relationship,
            ref: "Major", 
            many: true
        },
        gender_F: {type: Integer}, 
        gender_M: {type: Integer},
        gender_NB: {type: Integer},
        gender_N: {type: Integer},
        race_WC: {type: Integer},
        race_API: {type: Integer},
        race_H: {type: Integer},
        race_BAA: {type: Integer},
        race_AIAN: {type: Integer},
        race_N: {type: Integer},
        levelOfStudy_HS: {type: Integer},
        levelOfStudy_TS: {type: Integer},
        levelOfStudy_UU: {type: Integer},
        levelOfStudy_GU: {type: Integer},
        levelOfStudy_N: {type: Integer},
        diet_VT: {type: Integer},
        diet_VE: {type: Integer},
        diet_L: {type: Integer},
        diet_G: {type: Integer},
        diet_NA: {type: Integer},
        diet_H: {type: Integer},
        diet_K: {type: Integer},
        diet_O: {type: Integer},
        diet_N: {type: Integer},
        shirt_XS: {type: Integer},
        shirt_S: {type: Integer},
        shirt_M: {type: Integer},
        shirt_L: {type: Integer},
        shirt_XL: {type: Integer},
        shirt_XXL: {type: Integer},
    },
};

module.exports = Metric;