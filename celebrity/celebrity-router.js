const router = require("express").Router();
const celebrities = require("./celebrity-model.js");

router.get("/", async (req, res) => {
  try {
    const celebrity = await celebrities.getCeleb();
    res.status(200).json(celeb);
  } catch {
    res.status(500).json({ Message: "No celebrity was found" });
  }
});

router.get("/all", async (req, res) => {
  try {
    const celebrity = await celebrities.allCelebs();
    res.status(200).json(celebrity);
  } catch {
    res.status(500).json({ Message: "No celebrities were found" });
  }
});

router.post("/", async (req, res) => {
  const newCeleb = req.body;

  try {
    const addCeleb = await celebrities.addCeleb(newCeleb);
    res.status(201).json({ Message: "New Celebrity Added", addCeleb });
  } catch (err) {
    res.status(500).json({ Message: "Celebrity could not be added", err });
  }
});

module.exports = router;
