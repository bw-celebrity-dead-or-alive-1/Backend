const router = require('express').Router();
const bcrypt = require('bcrypt');

const {restricted, genToken} = require('../middleware/restricted-middleware');

const {
    validateBody,
    validateLoginBody,
    validateBodyOR
} = require('./users.middleware');

const Users = require('./users-model');

//update all routes with /users :)

//get list of users

// router.get('/users', async (req, res) => {
//     const {page, limit} = req.query;

//     try {
//         const users = await Users.get(undefined, limit, (page - 1) * limit );
//         res.status(200).json(players);
//     }
//     catch (err) {
//         res.status(500).json({message: "Couldn't retrieve list of users"})
//     }
// })

//get single User By ID - NOT WORKING

router.get('/user/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const user = await Users.findById(id);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({
          message: "No user with the specified id id"
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Couldn't retrieve the user with the specified id." });
    }
})
//register user -working

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

        Users.add(user)
            .then(saved => {
                const token = genToken(saved)
                //same as token: token
                res.status(201).json({created_user: saved, message: "Successfully Registered!", token})
            })
            .catch(err => {
                res.status(500).json({message: "Error Creating User in the Database", err})
            })
    }   else {
        res.status(400).json("Registration Error!")
    }

});

//get all users - working
router.get("/users", validateLoginBody, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error fetching logged in users", err})
        })
});
//get users test scores
router.get("/:id/scores", restricted, async (req, res) => {
  try {
    const { id } = req.params;
    const scores = await Users.getPlayerScores(id);
    if (scores[0]) {
      res.status(200).json(scores);
    } else {
      res.status(404).json({
        message: "No scores for user with that id"
      });
    }
  } catch (error) {
    res.status(500)
      .json({ message: "Couldn't retrieve the scores for the user" });
  }
});

//log in a user - working
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



// working
router.put("/:id", validateBodyOR, (req, res) => {
  try {
    const { id } = req.params;
    const user = Users.update(id, req.body);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({
        message: "No user located with the matching id"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't update the user" });
  }
});

//working
router.delete("/:id",  (req, res) => {
  try {
    // restricted(req, res)


    console.log(req)
     Users.remove(req.params.id)
      .then(deleted => {
        deleted
          ? res.status(200).json({ message: "Successful delete" })
          : res.status(400).json({ message: "Error upon delete" });
      }) 
  } 
  catch (error) {
    res.status(500).json({ message: "Couldn't delete the user" });
  }
});

//get all users - WORKING
// router.get('/users', async (req, res) => {

//     try {
//         const users = await Users.getAllUsers()

//         res.status(200).json(users)
//     } catch(err) {
//         res.status(500).json({ message: 'Something went wrong with the server!'})
//     }
    
// })


//get All Admins - NOT WORKING
router.get('/admin', async (req, res) => {

    try {
        const admins = await Users.getAllAdmins()

        res.status(200).json(admins)
    } catch {
        res.status(500).json({ message: 'Something went wrong with the server!'})
    }
    
})

//Single Admin By ID

router.get('/admin/:id', restricted, async (req, res) => {
    const { id } = req.params
    console.log(req.params)

    try {
        const admin = await Users.getSingleAdmin(id)

        !admin.id ? res.status(404).json({message: admin}) : res.status(200).json(admin)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server!'})
    }
})





module.exports = router