exports.up = function(knex) {
  return knex.schema.alterTable("celebrities", celebs => {
    celebs.string("fact");
  });
};

exports.down = function(knex) {
  return knex.schema.alterTable("celebrities", celebs => {
    celebs.dropColumn("fact");
  });
};
