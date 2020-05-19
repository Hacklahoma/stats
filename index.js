const { Keystone } = require("@keystonejs/keystone");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { KnexAdapter: Adapter } = require("@keystonejs/adapter-knex");
const { NextApp } = require("@keystonejs/app-next");
const dotenv = require("dotenv");

// Getting environmental variables
dotenv.config();

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
});

// Export
module.exports = {
    keystone,
    apps: [
        new GraphQLApp(),
        new AdminUIApp({ enableDefaultRoute: false, adminPath: "/admin-ui" }),
        new NextApp({ dir: "src" }),
        "dist",
    ],
};
