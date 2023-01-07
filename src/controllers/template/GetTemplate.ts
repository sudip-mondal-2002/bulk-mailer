import {RequestHandler} from "express";
import {AppDataSource} from "../../ormconfig";
import {EmailEntity} from "../../entities/EmailEntity";
import {UserEntity} from "../../entities";
import {NotFoundError, UnauthorizedError} from "../../errors";
import {InternalServerError} from "../../errors/InternalServerError";

const emailRepository = AppDataSource.getRepository(EmailEntity);
export const getTemplate: RequestHandler = async (req, res) => {
    const {id} = req.params
    const emailTemplate = await emailRepository.findOne({
        where: {
            id: parseInt(id)
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

    res.status(200).json(emailTemplate)
}

export const getTemplates: RequestHandler = async (req, res) => {
    try {
        const emailTemplates = await emailRepository.find({
            relations: ["user"],
            where: [
                {
                    is_private: false
                },
                {
                    user: {id: req.currentUser?.id, name:req.currentUser?.name, email: req.currentUser?.email} as UserEntity
                }
            ]
        }) as EmailEntity[]
        return res.status(200).json(emailTemplates)
    } catch (e) {
        console.log(e)
        throw new InternalServerError()
    }
}