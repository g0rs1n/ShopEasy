import User from '../../models/User/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {validationResult, matchedData} from 'express-validator'

export const authorization = async (req, res) => {
    try {

        const result = validationResult(req)

        if(!result.isEmpty()) {
            return res.status(400).json({error: result.array()})
        }
        
        const {email, password} = matchedData(req)

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            return res.status(409).json({
                error: "No access"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            return res.status(409).json({
                error: "No access"
            })
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.Jwt_Secret, {expiresIn: '1d'})

        res.cookie('token', token, {
            httpOnly: true
        })

        res.status(201).json({
            error: "You are logged in"
        })
        
    } catch (error) {
        console.error("Error: authorization", error)
        res.status(400).json({
            message: "Registration failed",
            error: error.message
        })
    }
}