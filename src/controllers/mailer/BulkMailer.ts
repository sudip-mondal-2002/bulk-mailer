import {RequestHandler} from "express";
import {EmailEntity, UserEntity} from "../../entities";
import {Mailer} from "../../utils/Mailer";
import {AppDataSource} from "../../ormconfig";
import {DatabaseConnectionError, NotFoundError, ServiceUnavailableError} from "../../errors";
import {IdParser} from "../../utils/IdParser";
import {HttpHeaders} from "../../enums";

const mailer = new Mailer()
const emailRepository = AppDataSource.getRepository(EmailEntity);
export const bulkMailer: RequestHandler = async (req, res) => {
    const {template_id, mapping, subject} = req.body
    const user = {
        id: req.currentUser?.id,
        email: req.currentUser?.email,
        name: req.currentUser?.name
    } as UserEntity
    let template;
    try {
        template = await emailRepository.findOne({
            where: [
                {
                    id: template_id,
                    user: user,
                    is_deleted: false
                }, {
                    id: template_id,
                    is_private: false,
                    is_deleted: false
                }
            ]
        })
    } catch (e) {
        throw new DatabaseConnectionError()
    }
    if (!template) {
        throw new NotFoundError("Template not found");
    }

    const {body} = template
    try{
        await mailer.sendBulkEmail(subject, body, mapping)
    } catch (e){
        console.log(e)
        throw new ServiceUnavailableError("Unable to send email")
    }
    res.status(204).send()
}