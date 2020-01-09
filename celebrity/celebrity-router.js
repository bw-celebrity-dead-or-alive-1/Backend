const router = require("express").Router();
const celebrities = require("./celebrity-model.js");

const {
    validateCelebBody,
    validateCelebBodyUpdate,
    validateCelebs
} = require('./celeb-middleware');

const { restricted } = require("../middleware/restricted-middleware");

//paginated celebs
// router.get("/", async (req, res) => {
//   try {
//     const celeb = await celebrities.paginate(limit, (page - 1) * limit);
//     res.status(200).json(celeb);
//   } catch {
//     res.status(500).json({ Message: "No celebrity list was found" });
//   }
// });

 router.get("/", async (req, res) => {

  try {
   await celebrities.allCelebs()
      .then(celebrities => {
        console.log(celebrities)
        res.status(200).json(celebrities);
      })
    
  } catch (error) {
    res.status(500).send(console.log(error) );
  }
});



//single celeb

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const celeb = await celebrities.getCelebs({id});

        if (celeb) {
             res.status(200).json(celeb);
        } else {
        res.status(404).json({ message: 'No celebrity with that id' });
            }
        } catch (err) {
             res.status(500).json({ message: "Couldn't retrieve the celebrity" });
            }

    }
);

//random

router.get('/random', async (req, res) => {
    try {
        const {id} = req.params;
        const celeb = await celebrities.getCelebs({id});

        if (celeb) {
            res.status(200).json(celeb);
        }
        else {
            res.status(404).json({message: 'No celebrity image matches with the selected id'});
        }
    }   catch (err) {
            res.status(500).json({message: 'Could retrieve the celebrity iamge'})
        }
    }
);

//add new Celeb - working
router.post("/", validateCelebBody, async (req, res) => {
  const newCeleb = req.body;

  try {
    console.log(req.body)
    await celebrities.addCelebs(newCeleb)
      .then(celebs => {
        res.status(201).json({ Message: "New Celebrity Added", celebs });
      })
    
  } catch (err) {
    res.status(500).send((console.log(err)));
  }
});

//edit Celebrity - working
router.put("/:id", validateCelebBodyUpdate, async (req, res) => {
  try {
    console.log(req)
   await celebrities.update(req.params.id, req.body)
      .then(celebs => {
        res.status(200).json(celebs);
      })
    
  } catch (error) {
    res.status(500).send(console.log(error));
  }
});

//delete Celebrity
router.delete("/:id", validateCelebs, restricted, async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await celebrities.remove(id);
    if (celeb) {
      res.status(200).json(celeb);
    } else {
      res.status(404).json({
        message: "No celebrity with that id"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't delete the celebrity" });
  }
});

module.exports = router;
