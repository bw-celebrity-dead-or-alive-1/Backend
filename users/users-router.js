const router = require('express').Router();
const bcrypt = require('bcyrptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../auth/secret');

const Users = require('./users-model');

router.get('/register', (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error fetching registered users", err})
        })


})

// router.post("/register", (req, res) => {});

router.get("/login", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error fetching logged in users", err})
        })
});
// router.post("/login", (req, res) => {});
// router.put("/editProfile", (req, res) => {});
// router.delete("/deleteProfile", (req, res) => {});


function genToken(user) {
  const payload = {
    username: user.username
  };

  const options = { expiresIn: "1hr" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}


module.exports = router