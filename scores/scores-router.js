const router = require("express").Router();
const Scores = require("./scores-model");

require("dotenv").config();

const {
  validatePBody,
  validatePBodyOR,
  validateScore
} = require("./scores-middleware");

const { restricted, genToken } = require("../middleware/restricted-middleware");

//working paginated scores

router.get("/", restricted, async (req, res) => {
  try {
    console.log(req);
    await Scores.paginate(
      req.query.limit,
      (req.query.page - 1) * req.query.limit
    ).then(scores => {
      res.status(200).json(scores);
    });
  } catch (error) {
    res.status(500).send(console.log(error));
  }
});

//  router.get("/", async (req, res) => {
//    try {
//      await scores.getScore().then(scores => {
//        console.log(scores);
//        res.status(200).json(scores);
//      });
//    } catch (error) {
//      res.status(500).send(console.log(error));
//    }
//  });


//working - single score for a user
router.get("/:id", restricted, async (req, res) => {
  try {
    await Scores.getScore(req.params.id).then(score => {
      if (score) {
        res.status(200).json(score);
      } else {
        res.status(404).json({
          message: "No user with that id or no record for the user yet"
        });
      }
    });
  } catch (error) {
    res.status(500).json(console.log(error));
  }
});
// WORKING

router.post("/", validatePBody, restricted, async (req, res) => {
  try {
   await Scores.create(req.body)
      .then(score => {
          res.status(201).json(score);
      })
  } catch (error) {
    res.status(500).json({ message: "Couldn't add the score", error });
  }
});

// WORKING
router.put("/:id", validatePBodyOR, restricted, async (req, res) => {
  try {
    await Scores.update(req.params.id, req.body)
        .then(score => {
            if (score) {
            res.status(200).json(score);
          } else {
            res.status(404).json({
              message: "No score with that id or no record for the score yet"});
          }
        })
      }
     catch (error) {
    res.status(500).json({ message: "Couldn't update the score" });
  }
});
// WORKING

router.delete("/:id", validateScore, restricted, async (req, res) => {
  try {
    
    await Scores.remove(req.params.id)
    .then(score => {
          if (score) {
            res.status(200).json(score);
          } else {
            res.status(404).json({
              message: "No score with that id" });
          }
        })
  } catch (error) {
    res.status(500).json({ message: "Couldn't delete the score record" });
  }
});

module.exports = router;
