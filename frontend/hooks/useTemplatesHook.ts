import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

export type Template = {
    name: string,
    html: string,
    id: number
}

export const UseTemplatesHook = () => {
    const [templates, setTemplates] = React.useState<Template[]>([])
    const [errors, setErrors] = React.useState([])
    const getTemplates = async () => {
        try {
            const response = await axios.get("http://localhost:8000/template", {
                headers: {
                    "Authorization": Cookies.get("token")
                }
            })
            return response.data.map((template: any)=>{
                return {
                    name: template.name,
                    html: template.html,
                    id: template.id
                } as Template
            })
        } catch (e: any) {
            setErrors(e.response?.data?.errors || [{"message": "Some error"}])
        }
        return []
    }
    const getTemplate = async (id: number) => {
        try {
            const response = await axios.get(`http://localhost:8000/template/${id}`, {
                headers: {
                    "Authorization": Cookies.get("token")
                }
            })
            return {
                name: response.data.name,
                html: response.data.html,
                id: response.data.id
            } as Template
        } catch (e: any) {
            setErrors(e.response?.data?.errors || [{"message": "Some error"}])
        }
        return null
    }

    const createTemplate = async (name: string, html: string) => {
        try {
            await axios.post("http://localhost:8000/template", {
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
            await axios.put(`http://localhost:8000/template/${id}`, {
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

    const deleteTemplate = async (id: number) => {
        try {
            await axios.delete(`http://localhost:8000/template/${id}`, {
                headers: {
                    "Authorization": Cookies.get("token")
                }
            })
        } catch (e: any) {
            setErrors(e.response?.data?.errors || [{"message": "Some error"}])
        }
    }

    React.useEffect(() => {
        getTemplates().then(res => {
            console.log(res)
            setTemplates(res)
        })
    }, [])
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