import User from "../../../models/User/User.js";
import jwt from 'jsonwebtoken'

export const getMe = async (req, res) => {
    try {

        const token = req.cookies.token
        const decodedToken = jwt.decode(token)
        const userId = decodedToken.id

        const user = await User.findOne({
            where: {
                id: userId
            }
        })

        if (!user) {
            return res.status(404).json({error: 'User not found'})
        }

        res.cookie('token', token, {
            httpOnly: true
        })

        res.status(200).json(user)

    } catch (error) {
        console.error("Error in retrieving user:", error)
    }
}