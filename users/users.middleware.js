require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = {
  validateBody,
  validateLoginBody,
  validateBodyOR,
};

function validateBody(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  if (firstName && lastName && email && password) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "Please provide the name, email and password" });
  }
}
function validateLoginBody(req, res, next) {
  const { username, password } = req.body;
  if (username && password) {
    next();
  } else {
    res.status(400).json({ message: "Please verify the username and password" });
  }
}

function validateBodyOR(req, res, next) {
  const { firstName, lastName, email, password } = req.body;
  if (firstName || lastName || email || password) {
    next();
  } else {
    res.status(400).json({
      message:
        "Please provide the field you want to update: name, email or password"
    });
  }
}

