exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", table => {
    table.increments();

    table
      .string("name", 255)
      .notNullable()
      .unique();

    table.string("description").notNullable();

    table.boolean("completed");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("projects");
};
