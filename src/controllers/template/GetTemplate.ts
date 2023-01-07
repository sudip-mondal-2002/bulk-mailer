import {RequestHandler} from "express";

export const getTemplate: RequestHandler = async (req, res) => {
    res.send('Hello World')
}

export const getTemplates: RequestHandler = async (req, res) => {
    res.send(['Hello World'])
}