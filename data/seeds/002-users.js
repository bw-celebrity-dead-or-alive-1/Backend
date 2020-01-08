
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex("users").insert([
        {
          id: 1,
          username: "lizdoyle",
          password: "pass",
          firstName: "Elizabeth",
          lastName: "Doyle",
          email: "lizdoyle@gmail.com",
          role: "user"
        },
        {
          id: 2,
          username: "megan",
          password: "pass",
          firstName: "Megan",
          lastName: "Doyle",
          email: "megan@gmail.com",
          role: "user"
        },

        {
          id: 3,
          username: "billy",
          password: "pass",
          firstName: "Billy",
          lastName: "Doyle",
          email: "billy@gmail.com",
          role: "user"
        },

        {
          id: 4,
          username: "Bob",
          password: "pass",
          firstName: "Bob",
          lastName: "Doyle",
          email: "bob@gmail.com",
          role: "user"
        },
        {
          id: 5,
          username: "Jan",
          password: "pass",
          firstName: "Jan",
          lastName: "Doyle",
          email: "jan@gmail.com",
          role: "user"
        }
      ]);
    });
};
