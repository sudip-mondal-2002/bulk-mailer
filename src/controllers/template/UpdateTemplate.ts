import {RequestHandler} from "express";
import {AppDataSource} from "../../ormconfig";
import {EmailEntity} from "../../entities/EmailEntity";
import {UserEntity} from "../../entities";
import {InternalServerError} from "../../errors/InternalServerError";

const emailRepository = AppDataSource.getRepository(EmailEntity);
export const updateTemplate: RequestHandler = async (req, res) => {
    try {
        const template = await emailRepository.update({
            id: parseInt(req.params.id),
            user: {
                id: req.currentUser?.id,
                name: req.currentUser?.name,
                email: req.currentUser?.email
            } as UserEntity
        },{
            name: req.body.name || undefined,
            body: req.body.body || undefined,
            is_private: req.body.is_private || undefined
        })
        return res.status(204).send();
    } catch (err) {
        throw new InternalServerError();
    }
}
