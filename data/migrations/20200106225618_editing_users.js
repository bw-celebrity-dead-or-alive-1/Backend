
exports.up = function(knex) {
  return knex.schema.alterTable('users', users => {
        users.string('role')
  
    })
}

exports.down = function(knex) {
      return knex.schema.alterTable('users', users => {
          users.dropColumn('role');
      });

};
