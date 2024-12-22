import User from '../../models/User/User.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const authorization = async (req, res) => {
    try {

        const {email, password} = req.body

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        if (!user) {
            res.status(409).json({
                message: "No access"
            })
        }

        const isPassword = await bcrypt.compare(password, user.password)

        if (!isPassword) {
            res.status(409).json({
                message: "No access"
            })
        }

        const token = jwt.sign({
            id: user.id
        }, process.env.Jwt_Secret, {expiresIn: '1d'})

        res.cookie('token', token, {
            httpOnly: true
        })

        res.status(201).json({
            message: "You are logged in"
        })
        
    } catch (error) {
        console.error("Error: authorization", error)
        res.status(400).json({
            message: "Registration failed",
            error: error.message
        })
    }
}