const db = require("../data/dbConfig");

module.exports = {
  getCelebs,
  addCelebs,
  allCelebs,
  update,
  remove,
  paginate
};


function getCelebs() {
  return db("celebrities").then(celeb => {
    let calculated = Math.random() * (celeb.length - 0);
    let rounded = Math.round(calculated);

    return db("celebrities")
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
  return db("celebrities");
    
  
}

function addCelebs(newCeleb) {
  return db("celebrities").insert(newCeleb, ["*"]);
}

function update(id, changes) {
    return db('celebrities').where({id}).update(changes)    
        .then(count => (count > 0 ? getCelebs ({id}) : null));
}

async function remove(id) {
    const celeb = await getCeleb({id});
    if(celeb) {
        await db('celebrities').where({id}).del();

        return celeb
    }
    return null;
}

function paginate(lim = 5, off = 0) {
    db("celebrities")
      .limit(lim)
      .offset(off);
}




