import jwt from 'jsonwebtoken'

export const checkAuth = async (req, res, next) => {
    try {
        
        const token = req.cookies.token

        if (!token) {
            return res.status(403).json({error: 'Access denied: No token or invalid token'})
        }

        const isToken = jwt.verify(token, process.env.Jwt_Secret)

        if (!isToken) {
            return res.status(403).json({error: 'Access denied: Invalid token'})
        }

        next()

    } catch (error) {
        res.status(403).json({ error: 'Access denied: Invalid token' });
    }
}