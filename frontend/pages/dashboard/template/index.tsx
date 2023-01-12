import React from "react";
import {UseTemplatesHook} from "../../../hooks/useTemplatesHook";
import {Button, Container, TextField} from "@mui/material";

export default function CreateTemplate (){
    const {createTemplate} = UseTemplatesHook({})
    const [code, setCode] = React.useState("")
    const [name, setName] = React.useState("")
    return <Container sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }}>
        <TextField value={name} onChange={(e)=>setName(e.target.value)} />
        <TextField multiline={true} rows={5} value={code} onChange={(e)=>setCode(e.target.value)}/>
        <Container dangerouslySetInnerHTML={{__html: code}} ></Container>
        <Button onClick={async ()=>{
            await createTemplate(name, code)
            window.location.href = "/dashboard"
        }}>Upload</Button>
    </Container>
}