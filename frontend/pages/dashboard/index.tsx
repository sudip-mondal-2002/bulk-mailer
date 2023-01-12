import React from "react";
import {UseAuthHook} from "../../hooks/useAuthHook";
import {UseTemplatesHook} from "../../hooks/useTemplatesHook";
import {Button, Container, Typography} from "@mui/material";

export default function Dashboard() {
    const {profile} = UseAuthHook()
    const {templates, errors} = UseTemplatesHook({})
    if (!profile) {
        return <Container className="dashboard">
            <Typography className="Loading">Loading</Typography>
        </Container>
    }
    return <Container className="dashboard">
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
}
