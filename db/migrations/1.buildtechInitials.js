exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return (
    knex.schema
      .raw('CREATE SCHEMA IF NOT EXISTS buildtech')
      .withSchema('buildtech')
      // Users
      .createTable('users', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('username').notNullable().unique();
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
      // Companies
      .createTable('companies', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('name').notNullable();
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
      // Projects
      .createTable('projects', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('landUse').notNullable();
        table.string('uniqueCode').unique();
        table.decimal('area', 11, 1);
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('buildtech.projects')
    .dropTableIfExists('buildtech.companies')
    .dropTableIfExists('buildtech.users');
};
