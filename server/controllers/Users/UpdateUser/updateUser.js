import User from "../../../models/User/User.js"
import jwt from 'jsonwebtoken'
import { validationResult, matchedData } from "express-validator"

export const updateUser = async (req, res) => {
    try {
        
        const result = validationResult(req)

        if (!result.isEmpty()) {
            return res.status(400).json({error: result.array()})
        }

        const editUserData = matchedData(req, { includeOptionals: true })
        const token = req.cookies.token
        const decodedToken = jwt.decode(token)
        const userId = decodedToken.id

        const currentUser = await User.findByPk(userId)

        if (!currentUser) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        const fieldsToUpdate = {}

        for (const key in editUserData) {
            if (editUserData[key] !== currentUser[key]){
                fieldsToUpdate[key] = editUserData[key]
            }
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(204).json({
                error: 'No changes detected'
            })
        }

        const [updatedRowCount, updatedRows] = await User.update(fieldsToUpdate, {
            where: {id: userId},
            returning: true,
        })

        if (updatedRowCount === 0) {
            return res.status(404).json({
                error: 'Failed to update user'
            })
        }

        const {password, ...updatedSafeUser} = updatedRows[0].dataValues

        console.log(updatedSafeUser)

        res.status(200).json({
            message: 'User updated successfully',
            updatedUser: updatedSafeUser
        })

    } catch (error) {
        console.error("Error: update user", error)
        res.status(500).json({error: error.message})
    }
}