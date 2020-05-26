/**
 * This overwrites Next.js's default app to include providers and whatnot.
 */

import { ApolloProvider } from "@apollo/client";
import "../public/defaults.css";
import client from "../lib/client";
import Head from "next/head";
import { useRouter } from "next/router";
import Sidebar from "../components/Sidebar";
import { useState, useEffect } from "react";
import { gql, useQuery } from "@apollo/client";

const GET_USER = gql`
    query getUser($token: ID!) {
        allUsers(where: { token: $token }) {
            id
            company
            isAdmin
        }
    }
`;

function MyApp({ Component, pageProps }) {
    const router = useRouter();
    // Storing token
    const [token, setToken] = useState(0);
    // Whether to render components or not (still loading)
    const [ready, setReady] = useState(false);
    // Storing user data
    const [user, setUser] = useState(false);
    // Calling query
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { token: token === null ? 0 : token },
        client: client,
    });

    // console.log(user);
    

    // Effect to execute when loading changes
    useEffect(() => {
        // If no longer loading and is not at login
        if (!loading && router.pathname !== "/login") {
            // Data is not found (no token or invalid token)
            if (data === undefined) {
                router.push("/login").then(() => {
                    setReady(true);
                });
                // Data found, setting user state
            } else {
                setUser(data.allUsers[0]);
                setReady(true);
            }
        }
    }, [loading]);

    // On render, get the key from local storage
    useEffect(() => {
        setToken(localStorage.getItem("token"));
    }, []);

    if (ready || router.pathname === "/login")
        return (
            <ApolloProvider client={client}>
                <Head>
                    <title>Statistics</title>
                </Head>
                {router.pathname !== "/login" && <Sidebar user={user} />}
                <Component user={user} {...pageProps} />
            </ApolloProvider>
        );
    else
        return (
            <Head>
                <title>Statistics</title>
            </Head>
        );
}

export default MyApp;
