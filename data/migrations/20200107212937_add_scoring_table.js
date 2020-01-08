
exports.up = function(knex) {
    return knex.schema.createTable("scores", tbl => {
      tbl.increments();
      tbl.integer("score").notNullable();
      tbl
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.timestamps(true, true);
    });

};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("scores");

};
