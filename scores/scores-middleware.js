const db = require('./scores-model');

module.exports = {
  validatePBody,
  validatePBodyOR,
  validateScore
};

async function validateScore(req, res, next) {
  const { id } = req.params;
  try {
    const score = await db.getScore(id);
    if (score) {
      next();
    } else {
      res.status(404).json({ message: "The score with that id doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't validate the score" });
  }
}
function validatePBody(req, res, next) {
  const { score } = req.body;
  if (score) {
    next();
  } else {
    res.status(400).json({ message: "Please provide the user_id and score" });
  }
}
function validatePBodyOR(req, res, next) {
  const { user_id, score } = req.body;
  if (user_id || score) {
    next();
  } else {
    res.status(400).json({
      message: "Please provide the field you want to update: user_id or score"
    });
  }
}