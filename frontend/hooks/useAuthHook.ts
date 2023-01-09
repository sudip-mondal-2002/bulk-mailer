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
            const result = await axios.post("http://localhost:8000/auth/signup", {
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
        console.log(email,password)
        try{
            const result = await axios.post("http://localhost:8000/auth/signin", {
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
        if(!token) return
        axios.get("http://localhost:8000/auth/user",{
            headers: {
                "Authorization": token
            }
        }).then(res=>{
            const user = {
                name: res.data.user.name,
                email: res.data.user.email
            } as Profile
            setProfile(user)
        }).catch(error=>{
            setErrors(error.response.errors)
        })
    },[])
    return {
        profile,
        errors,
        signup,
        signin
    }
}