import express from 'express'
import cors from 'cors'
import "express-async-errors"
import {errorHandler} from "./middlewares";
import {NotFoundError} from "./errors";

export const app = express()
app.use(cors({
    allowedHeaders: [HttpHeaders.CONTENT_TYPE, HttpHeaders.AUTHORIZATION],
    exposedHeaders: [HttpHeaders.AUTHORIZATION]
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
// Import all routes
import {authRouter, templateRouter, mailerRouter} from './routes'
import {HttpHeaders} from "./enums";

// Use all routes
app.use('/auth', authRouter)
app.use('/template', templateRouter)
app.use('/mail',mailerRouter)

app.all('*',  (req) => {
    console.log(req)
    throw new NotFoundError("Route not found")
})
app.use(errorHandler)
