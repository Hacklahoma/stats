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
import { gql, useQuery, useMutation } from "@apollo/client";

const GET_USER = gql`
    query getUser($token: ID!) {
        allUsers(where: { token: $token }) {
            id
            company
            isAdmin
        }
    }
`;

const ADD_EVENT = gql`
    mutation addEvent($id: ID!, $type: String!, $description: String) {
        addEvent(id: $id, type: $type, description: $description) {
            id
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
    // Adds view to user
    const [addEvent] = useMutation(ADD_EVENT, {
        client: client,
    });

    // If the browser exists, then compare tokens and reset them if necessary
    if (process.browser) {
        if (localStorage.getItem("token") !== token) {
            setToken(localStorage.getItem("token"));
        }
        // If we have a user and there is no token in session storage
        if (user && !sessionStorage.getItem("token")) {
            // Add token to session storage and add view
            sessionStorage.setItem(
                "token",
                Math.random()
                    .toString(36)
                    .substr(2)
            );
            // Adding view to user
            addEvent({
                variables: {
                    id: user.id,
                    type: "VIEW",
                    description: "Company View",
                },
            });
        }
    }

    // Effect to execute when loading changes
    useEffect(() => {
        // Condition: Not loading, not at login, and user is not defined already
        if (!loading && router.pathname !== "/login" && !user) {
            // Data is not found (no token or invalid token)
            if (data === undefined || data.allUsers.length === 0) {
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
