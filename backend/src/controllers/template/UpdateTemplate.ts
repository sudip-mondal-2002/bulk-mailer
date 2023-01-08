import {RequestHandler} from "express";
import {AppDataSource} from "../../ormconfig";
import {EmailEntity} from "../../entities/EmailEntity";
import {UserEntity} from "../../entities";
import {DatabaseConnectionError, NotFoundError} from "../../errors";

const emailRepository = AppDataSource.getRepository(EmailEntity);
export const updateTemplate: RequestHandler = async (req, res) => {
    let result;
    try {
        result = await emailRepository.update({
            id: parseInt(req.params.id),
            is_deleted: false,
            user: {
                id: req.currentUser?.id,
                name: req.currentUser?.name,
                email: req.currentUser?.email
            } as UserEntity
        }, {
            name: req.body.name || undefined,
            body: req.body.body || undefined,
            is_private: req.body.is_private || undefined
        })
    } catch (err) {
        throw new DatabaseConnectionError();
    }
    if (result.affected === 0) {
        throw new NotFoundError("Template not found")
    }
    return res.status(204).send();
}
