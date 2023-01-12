import React from "react";
import {UseAuthHook} from "../../hooks/useAuthHook";
import {Button, Container, FormControl, TextField, Typography} from "@mui/material";

export default function Signup() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const {signup, errors} = UseAuthHook()
    return <Container className="auth signup">
        <Typography variant={"h1"}>Sign Up</Typography>
        <FormControl>
            <Container className="form-control">
                <Typography>Name</Typography>
                <TextField type="text" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            </Container>
            <Container className="form-control">
                <Typography>Email</Typography>
                <TextField type="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)}/>
            </Container>
            <Container className="form-control">
                <Typography>Password</Typography>
                <TextField type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            </Container>
            <Button variant={"contained"} type="submit" onClick={async (e) => {
                await signup(name, email, password)
            }}>Sign Up</Button>
        </FormControl>
        {errors && errors.map((e:{message: string, field?:string},i: number) =>{
                return <div key={i} className="error">
                    {e.message}
                </div>
        })}
    </Container>
}
