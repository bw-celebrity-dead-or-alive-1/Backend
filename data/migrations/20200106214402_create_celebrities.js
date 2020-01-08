
exports.up = function(knex) {
    return knex.schema.createTable('celebrities', celebs => {
        celebs.increments();
        celebs.string('firstName', 255).notNullable()
        celebs.string("lastName", 255).notNullable()
        celebs.integer('yearOfBirth').notNullable()
        celebs.boolean('alive').defaultTo(true).notNullable()
        celebs.integer('death').notNullable()
        celebs.string('image_url', 255).unique()
    })
  
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('celebrities');
};
