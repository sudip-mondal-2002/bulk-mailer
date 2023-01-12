import React from "react";
import {useRouter} from "next/router";
import {UseTemplatesHook} from "../../../hooks/useTemplatesHook";
import CSVReader from "react-csv-reader";
import {UseMailerHook} from "../../../hooks/useMailerHook";
import {Button, Container, MenuItem, Select, TextField, Typography} from "@mui/material";

export default function TemplateStandalone() {
    const router = useRouter()
    const {tid} = router.query
    const {templates, deleteTemplate} = UseTemplatesHook({tid})
    const [mapping, setMapping] = React.useState({})
    const [subject, setSubject] = React.useState("")
    const [fileData, setFileData] = React.useState<any[]>([])
    const {sendEmail} = UseMailerHook()
    return <Container className="template">
        <Typography variant={"h1"}>Template</Typography>
        {
            templates[0] && <Container sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column"
            }} className="template">
                <Typography variant={"h2"}>{templates[0].name}</Typography>
                <TextField type="text" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                <CSVReader
                    parserOptions={{header: true}}
                    onFileLoaded={(data) => {
                        setFileData(data)
                    }}/>
                {
                    templates[0].ids.map((id, i) => {
                        return <Container key={i}>
                            <Typography>{id}</Typography>
                            <Select key={id} onChange={(e) => {
                                setMapping({...mapping, [id]: e.target.value})
                            }}>

                                {fileData.length > 0 && Object.keys(fileData[0]).map((k, i) => {
                                    return <MenuItem value={k} key={i}>{k}</MenuItem>
                                })}
                            </Select>
                        </Container>
                    })
                }
                <Typography>Email</Typography>
                <Select id="email" onChange={(e) => {
                    setMapping({...mapping, email: e.target.value})
                }}>

                    {fileData.length > 0 && Object.keys(fileData[0]).map((k, i) => {
                        return <MenuItem value={k} key={i}>{k}</MenuItem>
                    })}
                </Select>
                <Container>
                    <Button onClick={async () => {
                        const structuredMap = fileData.map((row) => {
                            return {
                                to: row[mapping.email] || "",
                                data: Object.keys(mapping).map((id) => {
                                    return {
                                        id,
                                        value: row[mapping[id]] || ""
                                    }
                                })
                            }
                        }).filter((row) => row.to !== "")
                        await sendEmail(tid, subject, structuredMap)
                        window.location.href = "/dashboard"
                    }}>
                        Send
                    </Button>
                    <Button onClick={async () => {
                        await deleteTemplate();
                        window.location.href = "/dashboard"
                    }}> Delete </Button>
                </Container>
            </Container>
        }
        {templates.length && <Container dangerouslySetInnerHTML={{__html: templates[0].html}}/>}
    </Container>
}