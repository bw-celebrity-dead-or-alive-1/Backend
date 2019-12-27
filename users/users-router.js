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

router.post("/register", (req, res) => {
    //post method for login credentials
    let user = req.body;

    //if missing username or password during registration
    if(!user.username || !user.password) {
        res.status(404).json({message: 'Missing Username or Password. Please reenter credentials'})
    } 

    //if has username and password then... register or error
    if(user.username && user.password) {
        const hash = bcrypt.hashSync(user.password, 12)

        user.password = hash;

        Users.add(uesr)
            .then(saved => {
                const token = genToken(saved)
                //same as token: token
                res.status(201).json({created_user: saved, message: "Successfully Registered!", token})
            })
            .catch(err => {
                res.status(500).json({message: "Error Creating User in the Database", err})
            })
    }   else {
        res.status(400).json({"Registration Error!"})
    }

});

router.get("/login", (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error fetching logged in users", err})
        })
});
router.post("/login", (req, res) => {
     // login

  console.log(req.body);
  let { username, password } = req.body;

  //if no credentials provided
  if (!username || !password) {
     res.status(401).json({ message: "Missing username or password" });
  }



  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
          const token = genToken(user);

         res.status(201).json({ message: "Successfully Log In!", token});
      } else {
          res.status(404).json({ message: "Credentials Error. Please verify the provided username and password!" });
      }
    })
    .catch(err => {
      console.log(err);
       res.status(500).json({message: "Login Error within the Database!", err});
    });

});
// router.put("/editProfile/:id", (req, res) => {});
// router.delete("/deleteProfile/:id", (req, res) => {});


function genToken(user) {
  const payload = {
    username: user.username
  };

  const options = { expiresIn: "1hr" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);

  return token;
}


module.exports = router