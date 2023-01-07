import {RequestHandler} from "express";
import jwt from "jsonwebtoken";
import {UserJwtPayload} from "../payloads";

export const currentUser: RequestHandler = async (req, res, next) => {
    if (!req.headers['authorization']) {
        return next()
    }
    try {
        const token = req.headers['authorization'].toString()
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        req.currentUser = jwt.verify(token, process.env.JWT_KEY!) as UserJwtPayload
    } catch (e) {
        console.log(e)
    }
    next()
}