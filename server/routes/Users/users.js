import { Router } from "express";
import {getMe} from "../../controllers/Users/GetMe/getMe.js"
import { updateUser } from "../../controllers/Users/UpdateUser/updateUser.js";
import {checkAuth} from "../../utils/Check/СheckAuth/checkAuth.js"
import { checkSchema } from "express-validator";
import {validationUpdateSchema} from "../../utils/ValidationSchemas/ValidationUpdateSchema/validationUpdateSchema.js"

const router = new Router()

// Get Me
// http://localhost:5001/api/users/me
router.get('/me', checkAuth, getMe)

// Update User
// http://localhost:5001/api/users/me/profile
router.patch('/me/profile', checkAuth, checkSchema(validationUpdateSchema), updateUser)

export default router