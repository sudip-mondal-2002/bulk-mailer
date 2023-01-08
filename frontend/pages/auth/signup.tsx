import React from "react";
import {UseAuthHook} from "../../hooks/useAuthHook";

export default function Signup() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const {signup, error} = UseAuthHook()
    return <div className="auth signup">
        <h1>Signup</h1>
        <form onSubmit={async (e) => {
            e.preventDefault()
            await signup(name, email, password)
        }}>
            <div className="form-control">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </div>
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
    </div>
}
