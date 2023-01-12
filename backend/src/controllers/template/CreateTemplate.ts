import {RequestHandler} from "express";
import {UserJwtPayload} from "../../payloads";
import {EmailEntity} from "../../entities/EmailEntity";
import {AppDataSource} from "../../ormconfig";
import {UserEntity} from "../../entities";
import {IdParser} from "../../utils/IdParser";
import {DatabaseConnectionError} from "../../errors";

const userRepository = AppDataSource.getRepository(UserEntity);
const emailRepository = AppDataSource.getRepository(EmailEntity);
export const createTemplate: RequestHandler = async (req, res) => {
    const {name, html} = req.body
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const user = req.currentUser as UserJwtPayload
    let emailBody
    try {

        const userEntity = await userRepository.findOne({
            where: {
                id: user.id
            }
        }) as UserEntity
        const emailTemplate = new EmailEntity(name, html, userEntity)
        emailBody = await emailRepository.save(emailTemplate)
    } catch (e) {
        console.log(e)
        throw new DatabaseConnectionError()
    }
    const ids = IdParser.parseId(html)
    res.status(201).send({...emailBody, ids})
}
