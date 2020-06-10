const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { KnexAdapter: Adapter } = require("@keystonejs/adapter-knex");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { NextApp } = require("@keystonejs/app-next");
const { User, Event, Year, Hacker, Admin, Metric } = require("./models");
const { addUser, changeUser, login, uploadYear, addEvent, addView } = require("./resolvers");
const keepAwake = require("./src/lib/keepAwake");

// Get environmental variables
require("dotenv").config();

// Keep heroku app alive
keepAwake();

// Configuration for initiating keystone
const PROJECT_NAME = "stats";
const adapterConfig = {
    dropDatabase: true,
    knexOptions: { connection: process.env.DATABASE_URL },
};

// Initiating keystone
const keystone = new Keystone({
    name: PROJECT_NAME,
    adapter: new Adapter(adapterConfig),
    cookieSecret: process.env.COOKIE_SECRET,
    onConnect: async () => {
        // Setting up admin account
        keystone.createItems({
            Admin: [{ username: process.env.ADMIN_USERNAME, password: process.env.ADMIN_PASSWORD }],
        });
    },
});

//Creating lists for Users and Events
keystone.createList("Admin", Admin);
keystone.createList("User", User);
keystone.createList("Event", Event);
keystone.createList("Year", Year);
keystone.createList("Hacker", Hacker);
keystone.createList("Metric", Metric);

//Adding custom schemas/resolvers
keystone.extendGraphQLSchema({
    mutations: [
        {
            schema: "addUser(company: String!, password: String!): User",
            resolver: addUser,
        },
        {
            schema: "changeUser(id: ID!, company: String, password: String, disabled: Boolean): User",
            resolver: changeUser,
        },
        {
            schema: "login(password: String, code: String): User",
            resolver: login,
        },
        {
            schema: "uploadYear(year: Int!, projects: Int!, data: String!): Year",
            resolver: uploadYear,
        },
        {
            schema: "addEvent(id: ID!, type: String!, description: String): Event",
            resolver: addEvent,
        },
        {
            schema: "addView(id: ID!): Event",
            resolver: addView,
        }
    ],
});

// Securing admin panel
const authStrategy = keystone.createAuthStrategy({
    type: PasswordAuthStrategy,
    list: "Admin",
    config: {
        identityField: "username",
        secretField: "password",
    },
});

// Export
module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({ enableDefaultRoute: false, adminPath: "/admin-ui", authStrategy }),
        new NextApp({ dir: "src" }),
        "dist",
    ],
};
