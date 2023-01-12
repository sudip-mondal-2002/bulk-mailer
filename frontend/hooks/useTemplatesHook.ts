import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

export type Template = {
    name: string,
    html: string,
    id: number,
    ids: string[]
}

export const UseTemplatesHook = ({tid}:{tid?:any}) => {
    const [templates, setTemplates] = React.useState<Template[]>([])
    const [errors, setErrors] = React.useState([])
    const getTemplates = async () => {
        try {
            const response = await axios.get("https://bulk-mailer-backend.azurewebsites.net/template", {
                headers: {
                    "Authorization": Cookies.get("token")
                }
            })
            return response.data.map((template: any)=>{
                return {
                    name: template.name,
                    html: template.body,
                    id: template.id,
                    ids: template.ids
                } as Template
            })
        } catch (e: any) {
            setErrors(e.response?.data?.errors || [{"message": "Some error"}])
        }
        return []
    }
    const getTemplate = async (id: number) => {
        try {
            const response = await axios.get(`https://bulk-mailer-backend.azurewebsites.net/template/${id}`, {
                headers: {
                    "Authorization": Cookies.get("token")
                }
            })
            return {
                name: response.data.name,
                html: response.data.body,
                id: response.data.id,
                ids: response.data.ids
            } as Template
        } catch (e: any) {
            setErrors(e.response?.data?.errors || [{"message": "Some error"}])
        }
        return null
    }

    const createTemplate = async (name: string, html: string) => {
        try {
            await axios.post("https://bulk-mailer-backend.azurewebsites.net/template", {
                name,
                html
            }, {
                headers: {
                    "Authorization": Cookies.get("token")
                }
            })
            setErrors([])
            setTemplates(await getTemplates())
        } catch (e: any) {
            setErrors(e.response?.data?.errors || [{"message": "Some error"}])
        }
    }

    const updateTemplate = async (id: number, name?: string, html?: string) => {
        try {
            await axios.put(`https://bulk-mailer-backend.azurewebsites.net/template/${id}`, {
                name,
                html
            },{
                headers: {
                    "Authorization": Cookies.get("token")
                }
            })
            setErrors([])
            setTemplates(await getTemplates())
        } catch (e: any) {
            setErrors(e.response?.data?.errors || [{"message": "Some error"}])
        }
    }

    const deleteTemplate = async (id: number = tid) => {
        try {
            await axios.delete(`https://bulk-mailer-backend.azurewebsites.net/template/${id}`, {
                headers: {
                    "Authorization": Cookies.get("token")
                }
            })
        } catch (e: any) {
            setErrors(e.response?.data?.errors || [{"message": "Some error"}])
        }
    }

    React.useEffect(() => {
        if(!tid) getTemplates().then(res => {
            setTemplates(res)
        })
        else getTemplate(tid).then(res => {
            if(res) setTemplates([res])
        })
    }, [tid])
    return {
        templates,
        errors,
        getTemplates,
        getTemplate,
        createTemplate,
        updateTemplate,
        deleteTemplate,
    }
}
