import {Router} from "express";
import {createTemplate, deleteTemplate, getTemplate, getTemplates, updateTemplate} from "../controllers";
import {currentUser, requestValidator, requireAuth} from "../middlewares";
import {body} from "express-validator";

const router = Router();

router.get('/', currentUser, getTemplates)

router.get('/:id', currentUser, getTemplate)

router.post('/', [
    body('name').trim().notEmpty().withMessage('Name must be provided'),
    body('html').trim().notEmpty().withMessage('HTML must be provided')
], requestValidator, currentUser, requireAuth, createTemplate)

router.put('/:id', currentUser, requireAuth, updateTemplate)

router.delete('/:id', currentUser, requireAuth, deleteTemplate)

export {router as templateRouter}