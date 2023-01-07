import {Router} from "express";
import {deleteTemplate, getTemplate, getTemplates, updateTemplate} from "../controllers";
import {currentUser, requireAuth} from "../middlewares";
import {body} from "express-validator";

const router = Router();

router.get('/templates', currentUser, getTemplates)

router.get('/template/:id', currentUser, getTemplate)

router.post('/template', currentUser, requireAuth, [
    body('name').trim().notEmpty().withMessage('Name must be provided'),
    body('html').trim().notEmpty().withMessage('HTML must be provided')
], getTemplate)

router.put('/template/:id', currentUser, requireAuth, updateTemplate)

router.delete('/template/:id', currentUser, requireAuth, deleteTemplate)

export {router as templateRouter}