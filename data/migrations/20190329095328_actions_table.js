exports.up = function(knex, Promise) {
  return knex.schema.createTable("actions", table => {
    table.increments();

    table.string("description").notNullable();

    table.string("notes");

    table.boolean("completed");

    table
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("actions");
};
