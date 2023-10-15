const jwt = require('jsonwebtoken')
require('dotenv').config()
const jwt_secret = process.env.JWT_KEY

const authentication = (req, res, next) => {
    // const token = req.body.token
    const token = req.headers.authorization.split(" ")[1]
    console.log(token)
    try {
        const decode = jwt.verify(token, jwt_secret)
        req.userData = decode
        next()
        // return res.status(200).json({ message: 'auhtorized', decode })
    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
}

const authorizeAdmin = (req, res, next) => {
    const user = req.userData;
    if (user && user.role === 'admin') {
        next();
        console.log('verified')
    } else {
        // User is not an admin, deny access
        res.status(403).json({ message: 'Access denied. Admin privilege required.' });
    }
};

module.exports = {
    authentication,
    authorizeAdmin
}