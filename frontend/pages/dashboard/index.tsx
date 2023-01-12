import React from "react";
import {UseAuthHook} from "../../hooks/useAuthHook";
import {UseTemplatesHook} from "../../hooks/useTemplatesHook";
import {Button, Container, Typography} from "@mui/material";
import Head from "next/head";

export default function Dashboard() {
    const {profile} = UseAuthHook()
    const {templates, errors} = UseTemplatesHook({})
    if (!profile) {
        return <Container className="dashboard">
            <Typography className="Loading">Loading</Typography>
        </Container>
    }
    return <>
        <Head>
            <title>Dashboard</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Container className="dashboard">
        {
            templates.map((t, i) => {
                    return <Container key={i} className="template">
                        <Button className="title" onClick={()=>window.location.href = `/dashboard/template/${t.id}`}>
                            {t.name}
                        </Button>
                    </Container>
                }
            )
        }
    </Container>
        </>
}
