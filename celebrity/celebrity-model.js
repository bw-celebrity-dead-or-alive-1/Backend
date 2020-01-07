const db = require("../data/dbConfig");

function getCeleb() {
  return db("celebs").then(celeb => {
    let calculated = Math.random() * (celeb.length - 0);
    let rounded = Math.round(calculated);

    return db("celebs")
      .where({ id: rounded })
      .first()
      .then(celeb => {
        if (celeb.death > 0) {
          celeb.dead = true;
        } else if (celeb.death === 0) {
                 celeb.dead = false;
               }
        return celeb;
      });
  });
}

function allCelebs() {
  return db("celebs").then(celeb => {
    return celeb;
  });
}

function addCeleb(newCeleb) {
  return db("celebs").insert(newCeleb, ["*"]);
}

module.exports = {
  getCeleb,
  addCeleb,
  allCelebs
};
