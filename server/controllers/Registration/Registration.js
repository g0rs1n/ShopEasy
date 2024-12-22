import User from '../../models/User/User.js'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

export const registration = async (req, res) => {
    try {
        
        const {name, email, password} = req.body

        const user = await User.findOne({
            where: {
                [Op.or]:[
                    {name: name},
                    {email: email},
                ]
            }
        })

        if (user) {
            if (user.name === name) {
                res.status(409).json({
                    message: "This name is already taken"
                })
            }
            if (user.email === email) {
                res.status(409).json({
                    message: "This email is already taken"
                })
            }
        }

        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password, salt)

        const newUser = await User.create({
            name: name,
            email: email,
            password: hashPassword,
        })

        const token = jwt.sign({
            id: newUser.id
        }, process.env.Jwt_Secret, {expiresIn: '1d'})

        res.cookie('token', token, {
            httpOnly: true
        })

        res.status(201).json({
            message: "Registration successful"
        })

    } catch (error) {
        console.error('Error: registration', error)
        res.status(400).json({
            message: "Registration failed",
            error: error.message
        })
    }
}