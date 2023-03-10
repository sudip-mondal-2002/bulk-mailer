import Head from 'next/head'
import {Inter} from '@next/font/google'
import styles from '../styles/Home.module.css'
import React from "react";
import Cookies from "js-cookie";

const inter = Inter({subsets: ['latin']})

export default function Home() {
    React.useEffect(() => {
        // if not token in cookies, redirect to signin page
        // if token in cookies, redirect to dashboard page
        const token = Cookies.get("token")
        if (!token) {
            window.location.href = "/auth/signin"
        } else {
            window.location.href = "/dashboard"
        }
    }, [])
    return (
        <>
            <Head>
                <title>Bulk mailer</title>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main >
                redirecting...
            </main>
        </>
    )
}
