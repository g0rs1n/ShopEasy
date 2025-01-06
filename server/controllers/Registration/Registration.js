import User from '../../models/User/User.js'
import { Op } from 'sequelize'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import {validationResult, matchedData} from 'express-validator'

export const registration = async (req, res) => {
    try {
        
        const result = validationResult(req)

        if (!result.isEmpty()) {
            return res.status(400).json({error: result.array()})
        }

        const {name, email, password} = matchedData(req)

        const user = await User.findOne({
            where: {
                [Op.or]:[
                    {name: name},
                    {email: email},
                ]
            }
        })

        if (user) {
            let errorMsg;
            if (user.name === name) {
                errorMsg = 'This name is already taken'
            }
            if (user.email === email) {
                errorMsg = errorMsg ? `${errorMsg} and this email is already taken` : "This email is already taken"
            }
            return res.status(409).json({error: errorMsg})
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