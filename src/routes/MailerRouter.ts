import {Router} from "express";
import {currentUser, requestValidator, requireAuth} from "../middlewares";
import {body, header} from "express-validator";
import {bulkMailer} from "../controllers";

const router = Router();

router.post('/mail', currentUser, requireAuth, [
    body('template_id').trim().notEmpty().withMessage('Template ID must be provided'),
    body('mapping').isJSON().withMessage('Mapping must be a valid JSON'),
    header('recipients').trim().notEmpty().withMessage('Recipients CSV file must be provided')
],requestValidator, bulkMailer)


export {router as mailerRouter}