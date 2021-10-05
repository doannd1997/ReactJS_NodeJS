const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization')
    const token = authHeader && authHeader.split(' ')[1]
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Access token not found"
        })
    }

    try {
        const decoed = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.userId = decoed.userId
        next()
    }
    catch (error) {
        res.status(403).json({
            success: false,
            message: "Invalid Token"
        })
    }
    
}

module.exports = verifyToken