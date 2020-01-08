
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('scores').del()
    .then(function () {
      // Inserts seed entries
      return knex("scores").insert([
        { id: 1, user_id: 1, score: 50 },
        { id: 2, user_id: 2, score: 73 },
        { id: 3, user_id: 3, score: 82 },
        { id: 4, user_id: 4, score: 68 },
        { id: 5, user_id: 5, score: 99 }
      ]);
    });
};
