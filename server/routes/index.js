import { Router } from "express";
import authRoutes from './Auth/auth.js'
import usersRoutes from './Users/users.js'


const router = new Router()

// Auth
router.use('/auth', authRoutes)

// Users
router.use('/users', usersRoutes)


export default router