import React from "react";
import {UseTemplatesHook} from "../../../hooks/useTemplatesHook";

export default function CreateTemplate (){
    const {createTemplate} = UseTemplatesHook({})
    const [code, setCode] = React.useState("")
    const [name, setName] = React.useState("")
    return <div>
        <input value={name} onChange={(e)=>setName(e.target.value)} />
        <textarea value={code} onChange={(e)=>setCode(e.target.value)}/>
        <div dangerouslySetInnerHTML={{__html: code}} ></div>
        <button onClick={()=>createTemplate(name, code)}>Upload</button>
    </div>
}