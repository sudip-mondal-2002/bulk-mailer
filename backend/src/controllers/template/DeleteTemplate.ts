import {RequestHandler} from "express";
import {UserEntity} from "../../entities";
import {AppDataSource} from "../../ormconfig";
import {EmailEntity} from "../../entities/EmailEntity";
import {DatabaseConnectionError, NotFoundError} from "../../errors";
const emailRepository = AppDataSource.getRepository(EmailEntity);
export const deleteTemplate: RequestHandler = async (req, res) => {
    const id = parseInt(req.params.id);
    const user = {
        id: req.currentUser?.id,
        name: req.currentUser?.name,
        email: req.currentUser?.email
    } as UserEntity

    let result;
    try {
        result = await emailRepository.update({id, user, is_deleted: false}, {
            is_deleted: true
        })
    } catch (err) {
        throw new DatabaseConnectionError();
    }
    if (result.affected === 0) {
        throw new NotFoundError("Template not found")
    }
    return res.status(204).send();
}
