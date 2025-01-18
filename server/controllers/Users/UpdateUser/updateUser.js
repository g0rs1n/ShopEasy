import User from "../../../models/User/User.js"
import jwt from 'jsonwebtoken'

export const updateUser = async (req, res) => {
    try {
        
        const newUserData = req.body.newUserData
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

        for (const key in newUserData) {
            if (newUserData[key] !== currentUser[key]){
                fieldsToUpdate[key] = newUserData[key]
            }
        }

        if (Object.keys(fieldsToUpdate).length === 0) {
            return res.status(400).json({
                error: 'No changes detected'
            })
        }

        const [updatedRowCount, updatedRows] = await User.update(fieldsToUpdate, {
            where: {id: userId},
            returning: true,
        })

        if (updatedRowCount === 0) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        const updatedUser = updatedRows[0]

        res.status(200).json({
            message: 'User updated successfully',
            updatedUser: updatedUser
        })

    } catch (error) {
        console.error("Error: update user", error)
        res.status(500).json({error: error.message})
    }
}