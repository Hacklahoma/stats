/**
 * This overwrites Next.js's default app to include providers and whatnot.
 */

import { ApolloProvider } from "@apollo/client";
import { ThemeProvider } from "styled-components";
import "../public/defaults.css";
import client from "../lib/client";
import Head from "next/head";
import {useRouter} from "next/router";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    return (
        <ApolloProvider client={client}>
            <Head>
                <title>Statistics</title>
            </Head>
            {router.pathname !== "/login" && <Sidebar />}
            <Component {...pageProps} />
        </ApolloProvider>
    );
}

export default MyApp;
