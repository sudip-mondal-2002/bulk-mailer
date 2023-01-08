import {NextFunction, Request, Response} from "express";
import {UnauthorizedError} from "../errors";
export const requireAuth = async (req: Request , res: Response, next: NextFunction) => {
    if (!req.currentUser) {
        console.log(req.currentUser)
        throw new UnauthorizedError()
    }
    next()
}