/**
 * Creates the client to fetch data
 */

import fetch from "node-fetch";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

const httpLink = new HttpLink({
    uri: "/admin/api",
    credentials: "include",
    fetch,
});

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
});

export default client;
