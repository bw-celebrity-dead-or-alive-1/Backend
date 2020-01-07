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

function update(id, changes) {
    return db('celebs').where({id}).update(changes)    
        .then(count => (count > 0 ? getCeleb ({id}) : null));
}

const remove  = async id => {
    const celeb = await getCeleb({id});
    if(celeb) {
        await db('celebs').where({id}).del();

        return celeb
    }
    return null;
}

function paginate(lim = 5, off = 0) {
    db('celebs').limit(lim).offset(off);
}




module.exports = {
  getCeleb,
  addCeleb,
  allCelebs,
  update,
  remove,
  paginate
};
