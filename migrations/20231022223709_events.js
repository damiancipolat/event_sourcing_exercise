module.exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.increments('id').primary();
    table.string('type').notNullable();
    table.string('version').notNullable();
    table.text('payload').notNullable();
    table.text('created').notNullable();
  });
};

module.exports.down = function (knex) {
  return knex.schema.dropTable('events');
};
