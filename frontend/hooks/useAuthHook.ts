import React from "react";
import axios from "axios";
export const UseAuthHook = ()=>{
    const [token, setToken] = React.useState();
    const [profile, setProfile] = React.useState();
    const [error, setError] = React.useState();
    const signup = async (name: string, email:string, password:string)=>{
        try{
            const result = await axios.post("http://localhost:8000/auth/signup", {
                name,
                email,
                password
            })
            console.log(result)
        } catch (e: any){
            console.log(e)
            setError(e.message)
        }
    }
    return {
        token,
        profile,
        error,
        signup
    }
}