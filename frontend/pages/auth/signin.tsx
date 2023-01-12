import React from "react";
import {UseAuthHook} from "../../hooks/useAuthHook";
import {Button, Container, FormControl, InputLabel, TextField, Typography} from "@mui/material";
import Head from "next/head";

export default function Signin() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const {signin, errors} = UseAuthHook()
    return <>
        <Head>
            <title>Log in</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link rel="icon" href="/favicon.ico"/>
        </Head>
        <Container className="auth signin">
            <Typography variant={"h1"}>Sign In</Typography>
            <FormControl>
                <Container className="form-control">
                    <Typography>Email</Typography>
                    <TextField type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </Container>
                <Container className="form-control">
                    <Typography>Password</Typography>
                    <TextField type="password" id="password" value={password}
                               onChange={(e) => setPassword(e.target.value)}/>
                </Container>
                <Button variant={"contained"} type="submit" sx={{
                    marginTop: "20px"
                }} onClick={async (e) => {
                    await signin(email, password)
                }}>Sign In</Button>
            </FormControl>
            {errors && errors.map((e: { message: string, field?: string }, i: number) => {
                return <Typography key={i} className="error">
                    {e.message}
                </Typography>
            })}
        </Container>
    </>
}
