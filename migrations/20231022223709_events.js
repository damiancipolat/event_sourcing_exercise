module.exports.up = function (knex) {
  return knex.schema.createTable('events', (table) => {
    table.uuid('id').primary().notNullable();
    table.string('type').notNullable();
    table.string('version').notNullable();
    table.text('payload').notNullable();
  });
};

module.exports.down = function (knex) {
  return knex.schema.dropTable('events');
};
