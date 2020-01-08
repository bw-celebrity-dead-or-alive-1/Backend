const router = require("express").Router();
const Scores = require("./scores-model");

require("dotenv").config();

const {
  validatePBody,
  validatePBodyOR,
  validateScore
} = require("./scores-middleware");

const { restricted, genToken } = require("../middleware/restricted-middleware");

router.get("/", async (req, res) => {
  const { page, limit } = req.query;
  try {
    const scores = await Scores.paginate(limit, (page - 1) * limit);
    res.status(200).json(scores);
  } catch (error) {
    res.status(500).json({ message: "Couldn't retrieve the leaderboard list" });
  }
});

router.get("/scores/:id", restricted, async (req, res) => {
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
