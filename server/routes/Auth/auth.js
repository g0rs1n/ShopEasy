import {Router} from 'express'
import { registration } from '../../controllers/Registration/Registration.js'
import { authorization } from '../../controllers/Authorization/Authorization.js'
import {checkSchema} from 'express-validator'
import {validationRegistrationSchema, validationAuthorizationSchema} from '../../utils/ValidationSchemas/ValidationAuthSchema/validationAuthSchema.js'

const router = new Router()

// Registration
// http://localhost:5001/api/auth/registration

router.post('/registration', checkSchema(validationRegistrationSchema), registration)

// Authorization
// http://localhost:5001/api/auth/authorization

router.post('/authorization', checkSchema(validationAuthorizationSchema), authorization)

export default router