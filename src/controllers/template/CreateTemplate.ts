import {RequestHandler} from "express";

export const createTemplate: RequestHandler = async (req, res) => {
    res.send('Hello World')
}
