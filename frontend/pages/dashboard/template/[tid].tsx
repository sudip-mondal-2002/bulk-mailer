import React from "react";
import {useRouter} from "next/router";
import {UseTemplatesHook} from "../../../hooks/useTemplatesHook";
import CSVReader from "react-csv-reader";

export default function TemplateStandalone() {
    const router = useRouter()
    const {tid} = router.query
    const {templates} = UseTemplatesHook({tid})
    const [mapping, setMapping] = React.useState({})
    const [subject, setSubject] = React.useState("")
    const [fileData, setFileData] = React.useState<any[]>([])
    return <div className="template">
        <h1>Template</h1>
        {
            templates[0] && <div className="template">
                <h2>{templates[0].name}</h2>
                <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)}/>
                <CSVReader
                    parserOptions={{header: true}}
                    onFileLoaded={(data) => {
                        setFileData(data)
                    }}/>
                {
                    templates[0].ids.map((id, i) => {
                        return <div key={i}>
                            <label htmlFor={id}>{id}</label>
                            <select id={id} onChange={(e) => {
                                setMapping({...mapping, [id]: e.target.value})
                            }}>

                                {fileData.length > 0 && Object.keys(fileData[0]).map((k, i) => {
                                    return <option value={k} key={i}>{k}</option>
                                })}
                            </select>
                        </div>
                    })
                }
                <label htmlFor="email">Email</label>
                <select id="email" onChange={(e) => {
                    setMapping({...mapping, email: e.target.value})
                }}>

                    {fileData.length > 0 && Object.keys(fileData[0]).map((k, i) => {
                        return <option value={k} key={i}>{k}</option>
                    })}
                </select>
                <div>
                    <button onClick={async () => {
                        console.log(mapping)
                        console.log(subject)
                        console.log(fileData)
                    }}>Send
                    </button>
                </div>
            </div>
        }
        {templates.length && <div dangerouslySetInnerHTML={{__html: templates[0].html}}/>}
    </div>
}