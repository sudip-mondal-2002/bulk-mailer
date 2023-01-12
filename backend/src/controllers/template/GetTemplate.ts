import {RequestHandler} from "express";
import {AppDataSource} from "../../ormconfig";
import {EmailEntity} from "../../entities/EmailEntity";
import {UserEntity} from "../../entities";
import {NotFoundError, UnauthorizedError} from "../../errors";
import {InternalServerError} from "../../errors/InternalServerError";
import { IdParser } from "../../utils/IdParser";

const emailRepository = AppDataSource.getRepository(EmailEntity);
export const getTemplate: RequestHandler = async (req, res) => {
    const {id} = req.params
    const emailTemplate = await emailRepository.findOne({
        where: {
            id: parseInt(id),
            is_deleted: false
        }
    }) as EmailEntity
    if (!emailTemplate) {
        throw new NotFoundError("Template not found")
    }
    if (emailTemplate.is_private) {
        if (req.currentUser?.id !== emailTemplate.user.id) {
            throw new UnauthorizedError()
        }
    }

    res.status(200).json({...emailTemplate, ids: IdParser.parseId(emailTemplate.body)})
}

export const getTemplates: RequestHandler = async (req, res) => {
    const conditions: {
        is_deleted?: boolean,
        is_private?: boolean,
        user?: UserEntity
    }[] = [
        {
            is_deleted: false,
            is_private: false
        }
    ]
    if (req.currentUser) {
        conditions.push({
            user: {id: req.currentUser?.id, name:req.currentUser?.name, email: req.currentUser?.email} as UserEntity,
            is_deleted: false
        })
    }
    try {
        const emailTemplates = await emailRepository.find({
            relations: ["user"],
            where: conditions
        }) as EmailEntity[]
        return res.status(200).json(emailTemplates.map(emailTemplate => {
            return {
                ...emailTemplate,
                ids: IdParser.parseId(emailTemplate.body)
            }
        }))
    } catch (e) {
        console.log(e)
        throw new InternalServerError()
    }
}