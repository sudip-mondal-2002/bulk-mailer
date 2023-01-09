import React from "react";
import {UseAuthHook} from "../../hooks/useAuthHook";

export default function Signin() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {signin, errors} = UseAuthHook()
    return <div className="auth signin">
        <h1>Signup</h1>
        <form onSubmit={async (e) => {
            e.preventDefault()
            await signin(email, password)
        }}>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </div>
            <button type="submit">Signup</button>
        </form>
        {errors && errors.map((e:{message: string, field?:string},i: number) =>{
            return <div key={i} className="error">
                {e.message}
            </div>
        })}
    </div>
}
