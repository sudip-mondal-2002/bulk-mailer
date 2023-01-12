import React from "react";
import axios from "axios";
import Cookies from "js-cookie";

export type Profile = {
    name?: string,
    email?: string
}
export const UseAuthHook = ()=>{
    const [profile, setProfile] = React.useState<Profile>();
    const [errors, setErrors] = React.useState([]);
    const signup = async (name: string, email:string, password:string)=>{
        try{
            const result = await axios.post("https://bulk-mailer-backend.azurewebsites.net/auth/signup", {
                name,
                email,
                password
            })
            setProfile({
                name: result.data?.name,
                email: result.data?.email
            })
            // @ts-ignore
            Cookies.set("token", result?.headers?.get("Authorization") ||"")
            setErrors([])
        } catch (e: any){
            console.log(e)
            setErrors(e.response?.data.errors || [{"message": "Some error"}])
        }
    }
    const signin = async (email:string, password:string)=>{
        try{
            const result = await axios.post("https://bulk-mailer-backend.azurewebsites.net/auth/signin", {
                email,
                password
            })
            setProfile({
                name: result.data?.name,
                email: result.data?.email
            })
            // @ts-ignore
            Cookies.set("token", result?.headers?.get("Authorization") ||"")

            setErrors([])
        } catch (e: any){
            console.log(e)
            setErrors(e.response?.data.errors || [{"message": "Some error"}])
        }
    }
    React.useEffect(()=>{
        const token = Cookies.get("token")
        console.log(token)
        if(!token) return
        axios.get("https://bulk-mailer-backend.azurewebsites.net/auth/user",{
            headers: {
                "Authorization": token
            }
        }).then(res=>{
            const user = {
                name: res.data.name,
                email: res.data.email
            } as Profile
            setProfile(user)
        }).catch(error=>{
            setErrors(error.response?.errors || [{"message": "Some error"}])
        })
    },[])
    return {
        profile,
        errors,
        signup,
        signin
    }
}