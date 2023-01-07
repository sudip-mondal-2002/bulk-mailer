import {RequestHandler} from "express";
import jwt from "jsonwebtoken";
import {UserJwtPayload} from "../payloads";

export const currentUser: RequestHandler = async (req, res, next) => {
    if (!req.headers['x-auth-token']) {
        return next()
    }
    try {
        const token = req.headers['x-auth-token'].toString()
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const payload = jwt.verify(token, process.env.JWT_KEY!) as UserJwtPayload
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req = {...req, currentUser: payload}
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        req = {...req, currentUser: null}
        console.log(e)
    }
    next()
}