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

router.get("/", async (req, res) => {
  try {
    console.log(req)
    await Scores.paginate(req.query.limit, (req.query.page - 1) * req.query.limit)
      .then(scores => {
        res.status(200).json(scores);
      })
    
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

router.get("/scores/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const score = await Scores.get(id);
    if (score[0]) {
      res.status(200).json(score);
    } else {
      res.status(404).json({
        message: "No user with that id or no record for the user yet"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't retrieve the user(s)" });
  }
});

router.post("/", validatePBody, async (req, res) => {
  try {
    const score = await Scores.create(req.body);
    res.status(201).json(score);
  } catch (error) {
    res.status(500).json({ message: "Couldn't add the score", error });
  }
});

router.put("/:id", validatePBodyOR, restricted, async (req, res) => {
  try {
    const { id } = req.params;
    const score = await Scores.update(id, req.body);
    if (score) {
      res.status(200).json(score);
    } else {
      res.status(404).json({
        message: "No score with that id or no record for the score yet"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't update the score" });
  }
});

router.delete("/:id", validateScore, restricted, async (req, res) => {
  try {
    const { id } = req.params;
    const score = await Scores.remove(id);
    if (score) {
      res.status(200).json(score);
    } else {
      res.status(404).json({
        message: "No score with that id"
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't delete the score record" });
  }
});

module.exports = router;
