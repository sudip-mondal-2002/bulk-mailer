import {Router} from "express";
import {currentUser, requestValidator, requireAuth} from "../middlewares";
import {body, header} from "express-validator";
import {bulkMailer} from "../controllers";

const router = Router();

router.post('/send', currentUser, requireAuth, [
    body('template_id').trim().notEmpty().withMessage('Template ID must be provided'),
    body('mapping').isArray().withMessage('Mapping must be a valid JSON Array'),
    body('mapping.*.to').isEmail().withMessage('Email must be valid'),
    body('subject').trim().notEmpty().withMessage('Subject must be provided')
],requestValidator, bulkMailer)


export {router as mailerRouter}