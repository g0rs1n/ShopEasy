import { Router } from "express";
import {getMe} from "../../controllers/Users/GetMe/getMe.js"
import {checkAuth} from "../../utils/Check/СheckAuth/checkAuth.js"

const router = new Router()

// Get Me
// http://localhost:5001/api/users/me
router.get('/me', checkAuth, getMe)

export default router