/**
 * This overwrites Next.js's default app to include providers and whatnot.
 */

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import "../public/defaults.css";
import client from "../lib/client";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <ApolloProvider client={client}>
            <Head>
                <title>Statistics</title>
            </Head>
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default MyApp;
