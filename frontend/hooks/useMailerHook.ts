import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

export const UseMailerHook = () => {
    const [errors, setErrors] = React.useState([])
    const sendEmail = async (template_id: any, subject: string, mapping: any[]) => {
        console.log(template_id, subject, mapping)
        try {
            await axios.post("https://bulk-mailer-backend.azurewebsites.net/mail/send", {
                template_id,
                subject,
                mapping
            }, {
                headers: {
                    "Authorization": Cookies.get("token")
                }
            })
            setErrors([])
        } catch (e: any) {
            setErrors(e.response?.data?.errors || [{"message": "Some error"}])
        }
    }

    return {
        sendEmail,
        errors
    }
}
