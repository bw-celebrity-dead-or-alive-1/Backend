const router = require('express').Router();
const bcrypt = require('bcrypt');

const {restricted, genToken} = require('../middleware/restricted-middleware');

const Users = require('./users-model');

//get logged in user info
router.get('/logged', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json({message: "There was an error fetching logged in users", err})
        })


})

//register user

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



// router.put("/editUser/:id", restricted, async, (req, res) => {
//     const { body } = req
//     const { id } = req.params

//     if(body.password) {
//         const hash = bcyrpt.hashSync(body.password, 12)
//         body.password = hash;
//     }

//      if(body.role === 'user') {
//         if( body.firstName.length === 0 || body.lastName.length === 0 ) {
//             res.status(400).json({message: 'Please make sure all the required fields are provided!'})
//          } 
//         else {
//             try {
//                 const editedUser = await Users.editUser(body, id)
//                 console.log(editedUser, 'user')
//                 !editedUser ? res.status(404).json({message: editedUser}) : res.status(200).json(editedUser)
//             } catch(err) {
//                 res.status(500).json({message: 'Something went wrong with the server!'})
//                  }
//             }
        
//         else if(body.role === 'admin') {
//             if(body.firstName.length === 0 ||body.lastName.length === 0) {
//                  res.status(400).json({message: 'Please make sure all the required fields are provided!'})
//             } 
//         else {
//             try {
//                 const editedUser = await Users.editUser(body, id)
//                 !editedUser ? res.status(404).json({message: editedUser}) : res.status(200).json(editedUser)
//             } catch(err) {
//                 res.status(500).json({message: 'Something went wrong with the server!'})
//                 }
//             }
//         }
//      }
//  }) 


router.delete("/:id", (req, res) => {
    const id = req.params.id;

    if(!id) {
        return res.status(404).json({message: "The user with the specified id doesn't exist!"})
    }
    else {
        Users.remove(id)
            .then(count => {
                return res.status(200).json({message: `The user with the id of ${id} has been successfully deleted`})
            })
            .catch(err => {
                return res.status(500).json({message: `Server error: User Id ${id} could not be deleted.`})
            })
    }
});

router.get('/users', restricted, async (req, res) => {

    try {
        const users = await Users.getAllUsers()

        res.status(200).json(users)
    } catch(err) {
        res.status(500).json({ message: 'Something went wrong with the server!'})
    }
    
})

//Single User By ID

router.get('/user/:id', restricted, async (req, res) => {
    const { id } = req.params
    console.log(req.params)

    try {
        const user = await Users.getSingleUser(id)

        !user.id ? res.status(404).json({message: user}) : res.status(200).json(user)
    } catch(err) {
        res.status(500).json({message: 'Something went wrong with the server!'})
    }
})

router.get('/admin', restricted, async (req, res) => {

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