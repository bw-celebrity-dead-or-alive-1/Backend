const db = require("./celebrity-model");

module.exports = {
  validateCelebBody,
  validateCelebBodyUpdate,
  validateCelebs
};

async function validateCelebs(req, res, next) {
  const { id } = req.params;
  try {
    const user = await db.get({ id });
    if (user) {
      next();
    } else {
      res
        .status(404)
        .json({ message: "The celebrity with that id doesn't exist" });
    }
  } catch (error) {
    res.status(500).json({ message: "Couldn't validate the celebrity" });
  }
}
function validateCelebBody(req, res, next) {
  const { firstName, lastName, yearOfBirth, alive } = req.body;
  if (firstName && lastName && yearOfBirth && alive) {
    next();
  } else {
    res.status(400).json({
      message:
        "Please provide the Name, Year of birth, and status of the celebrity."
    });
  }
}
function validateCelebBodyUpdate(req, res, next) {
  const { firstName, lastName, yearOfBirth, image_url } = req.body;
  if ((firstName && lastName) || yearOfBirth || death || image_url) {
    next();
  } else {
    res.status(400).json({
      message:
        "Please provide the field you want to update: name, info, birth, death or image_url"
    });
  }
}
