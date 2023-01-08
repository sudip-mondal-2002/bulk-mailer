import {UserJwtPayload} from "./payloads";

const PORT = process.env.PORT || 3000

import {app} from './app'
import {createServer} from 'http'
import dotenv from 'dotenv'
dotenv.config()

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        export interface Request {
            currentUser?: UserJwtPayload;
        }
    }
}

if(process.env.JWT_KEY === undefined) {
    if(process.env.NODE_ENV === "production") {
        throw new Error("JWT_KEY must be defined")
    } else {
        process.env.JWT_KEY = "dev"
    }
}

if(process.env.EMAIL_HOST_USER === undefined) {
    console.log("EMAIL_HOST_USER must be defined")
}

createServer(app).listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})