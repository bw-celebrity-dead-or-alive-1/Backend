const router = require("express").Router();
const celebrities = require("./celebrity-model.js");

const {
    validateCelebBody,
    validateCelebBodyUpdate,
    validateCelebs
} = require('./celeb-middleware');

const { restricted } = require("../middleware/restricted-middleware");

//paginated celebs
router.get("/", async (req, res) => {
  try {
    const celeb = await celebrities.paginate(limit, (page - 1) * limit);
    res.status(200).json(celeb);
  } catch {
    res.status(500).json({ Message: "No celebrity list was found" });
  }
});

//all celbs

router.get("/all", async (req, res) => {
  try {
    const celebrities = await celebrities.allCelebs();
    res.status(200).json(celebrities);
  } catch {
    res.status(500).json({ Message: "No celebrities were found" });
  }
});

//single celeb

router.get('/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const celeb = await celebrities.getCeleb({id});

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

//single celeb pic

router.get('/pic/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const celeb = await celebrities.getCeleb({id});

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

//add new Celeb
router.post("/", validateCelebBody, async (req, res) => {
  const newCeleb = req.body;

  try {
    const addCeleb = await celebrities.addCeleb(newCeleb);
    res.status(201).json({ Message: "New Celebrity Added", addCeleb });
  } catch (err) {
    res.status(500).json({ Message: "Celebrity could not be added", err });
  }
});

//edit Celebrity
router.put("/:id", validateCelebBodyUpdate, async (req, res) => {
  try {
    const { id } = req.params;
    const celeb = await celebrities.update(id, req.body);
    res.status(200).json(celeb);
  } catch (error) {
    res.status(500).json({ message: "Couldn't update the celebrity" });
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
