

exports.up = function (knex) {
    return knex.schema.createTable('users', users => {
        users.increments();
        users.string('username', 128).notNullable().unique();
        users.string('password', 128).notNullable();
        users.string('firstName', 128).notNullable();
        users.string('lastName', 128).notNullable();
        users.string('email', 255).notNullable();
        users.string('avatar', 255);


    })

};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users');
};
