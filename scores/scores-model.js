const db = require("../data/dbConfig");

module.exports = {
  get,
  create,
  getScore,
  update,
  remove,
  paginate
};

function get(id) {
  db
    .select(
      "s.score",
      "s.player_id",
      "s.id",
      "u.email",
      "u.name",
      "s.created_at"
    )
    .from("scores as s")
    .join("users as u", "s.user_id", "u.id")
    .where("u.id", id)
    .orderBy("score", "desc");

}
function paginate(lim = 20, off = 0) {
  db.select(
      "s.score",
      "s.user_id",
      "s.id",
      "u.firstName",
      "u.username",
      "s.created_at"
    )
    .from("scores as s")
    .join("users as u", "s.user_id", "u.id")
    .orderBy("score", "desc")
    .limit(lim)
    .offset(off);

}

function getScore() {
  db("scores")
    .where({ id })
    .first();
}
function create(score) {
  db("scores")
    .insert(score)
    .returning("id")
    .then(([id]) => getScore(id));
}

function update(id, changes) {
  db("scores")
    .where({ id })
    .update(changes)
    .then(count => (count > 0 ? getScore(id) : null));
}

async function remove(id) {
  const score = await getScore(id);
  if (score) {
    await db("scores")
      .where({ id })
      .del();
    return score;
  }
  return null;
};


