import {RequestHandler} from "express";
import {UnauthorizedError} from "../errors";
export const requireAuth: RequestHandler = async (req, res, next) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    if (!req.currentUser) {
        throw new UnauthorizedError()
    }
    next()
}