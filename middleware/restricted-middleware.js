const jwt = require('jsonwebtoken');

const secrets = require('../auth/secret');

module.exports = {
    genToken,
    restricted
}

function genToken(user) {
  const payload = {
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role
  };

  const options = { expiresIn: "1d" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}



function restricted(req, res, next) {

    const token = req.headers.authorization;

     if (req.decodedJwt) {
       next();
     } else if (token) {
       jwt.verify(token, secrets.jwtSecret, (err, decodedJwt) => {
         if (err) {
           res
             .status(401)
             .json({ message: "You shall not pass!, invalid token" });
         } else {
           req.decodedJwt = decodedJwt;
           next();
         }
       });
     } else {
       res.status(401).json({ message: "invalid token or no token provided" });
     }



};
