const jwt = require('jsonwebtoken');

const secrets = require('../auth/secret');

module.exports = (req, res, next) => {

    const token = req.headers.authorization;

    if (req.decodedJwt) {
        next()
    }
    else if (token) {
        jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
            if (err) {
                res.status(401).json({ message: "You shall not pass!" })
            }
            else {
                req.decodedJwt = decodedJwt;
                next()
            }
        })
    }
    else {
        req.status(401).json({ message: "invalid token or no token provided" })
    }



}
