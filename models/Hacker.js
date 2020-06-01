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
            options: "MALE, FEMALE, NON_BINARY, NO_ANSWER"
        },
        race: { 
            type: Select,
            options: "WHITE_OR_CAUCASION, ASIAN_OR_PACIFIC_ISLANDER, HISPANIC, " +
            "BLACK_OR_AFRICAN_AMERICAN, AMERICAN_INDIAN_OR_ALASKAN_NATIVE, NO_ANSWER"
        },
        levelOfStudy: {
            type: Select,
            options: "HIGH_SCHOOL, TECH_SCHOOL, UNDERGRADUATE_UNIVERSITY, GRADUATE_UNIVERSITY",
        },
        graduation: { type: DateTime },
        major: {
            type: Select,
            options: "ACCOUNTING, AEROSPACE_ENGINEERING, ARCHITECTURE, " +
                "ART_TECHNOLOGY_AND_CULTURE, AVIATION, BIOCHEMISTRY, " +
                "BIOINFORMATICS, BIOLOGY, BIOMEDICAL_ENGINEERING, " +
                "BUSINESS_ADMINISTRATION, BUSINESS_ANALYTICS_AND_INFORMATION_TECHNOLOGY, " +
                "BUSINESS_COMPUTER_INFORMATION_SYSTEMS, CHEMICAL_ENGINEERING, " +
                "CIVIL_ENGINEERING, COGNITIVE_SCIENCE, COMMUNICATION, " +
                "COMPUTER_ENGINEERING, COMPUTER_SCIENCE, CRIMINAL_JUSTICE, " +
                "CRIMINAL_JUSTICE_MANAGEMENT_AND_ADMINISTRATION, " +
                "DATA_SCIENCE_AND_ANALYTICS, ECONOMICS, ELECTRICAL_ENGINEERING, " +
                "ENGINEERING_PHYSICS, ENTREPRENEURSHIP, ENVIRONMENTAL_ENGINEERING, " +
                "GEOLOGY, HEALTH_AND_EXERCISE_STUDIES, INDUSTRIAL_AND_SYSTEMS_ENGINEERING, " +
                "INFORMATION_SCIENCE, INFORMATION_TECHNOLOGY_SYSTEMS, " +
                "INTERNATIONAL_SECURITY_STUDIES, INTERNATIONAL_BUSINESS, " +
                "JAPANESE, JOURNALISM, LETTERS, LINGUISTICS, " +
                "MANAGEMENT_INFORMATION_SYSTEMS, MASS_COMMUNICATION, MATHEMATICS, " +
                "MECHANICAL_ENGINEERING, MEDICINE, METEOROLOGY, MICROBIOLOGY, "+
                "MOLECULAR_BIOLOGY, MUSIC, PETROLEUM_ENGINEERING, PHSYCOLOGY, " +
                "PHYSICS, PUBLIC_HEALTH, SOFTWARE_DEVELOPMENT, SOFTWARE_ENGINEERING, " +
                "SPANISH, STATISTICS, RELIGIOUS_STUDIES, UNDECIDED, " +
                "WOMEN_AND_GENDER_STUDIES",
            many: true,
        },
        hackathons: { type: Integer },
        diet: { 
            type: Select,
            options: "VEGETARIAN, VEGAN, LACTOSE, GLUTEN, " +
                "NUT_ALLERGY, HALAL, KOSHER, OTHER"
        },
        shirt: {
            type: Select,
            options: "X_SMALL, SMALL, MEDIUM, LARGE, X_LARGE, XX_LARGE"
        },
        needsReimbursement: { type: Checkbox },
        github: { type: Url },
        website: { type: Url }
    },
    labelField: "name",
};

module.exports = Event;