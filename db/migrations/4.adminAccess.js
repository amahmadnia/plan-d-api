exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return knex.schema
    .withSchema('planD')
    .createTable('adminUserTypes', (table) => {
      table.uuid('id').notNullable().primary();
      table.string('name').notNullable();
      table.uuid('createdBy').references('id').inTable('buildtech.users');
      table.uuid('updatedBy').references('id').inTable('buildtech.users');
      table.boolean('deleted').notNullable().defaultTo(false);
      table.timestamps(true, true);
    })
    .createTable('adminUserTypeAccess', (table) => {
      table
        .uuid('userTypeId')
        .references('id')
        .inTable('planD.adminUserTypes')
        .notNullable();
      table
        .uuid('featureId')
        .references('id')
        .inTable('planD.features')
        .notNullable();
      table.uuid('createdBy').references('id').inTable('buildtech.users');
      table.uuid('updatedBy').references('id').inTable('buildtech.users');
      table.boolean('deleted').notNullable().defaultTo(false);
      table.primary(['userTypeId', 'featureId']);
      table.timestamps(true, true);
    })
    .createTable('adminAccess', (table) => {
      table.uuid('id').primary().notNullable();
      table
        .uuid('userId')
        .references('id')
        .inTable('planD.users')
        .notNullable();
      table
        .uuid('userTypeId')
        .references('id')
        .inTable('planD.adminUserTypes')
        .notNullable();
      table
        .uuid('companyId')
        .references('id')
        .inTable('planD.companies')
        .notNullable();
      table.uuid('createdBy').references('id').inTable('buildtech.users');
      table.uuid('updatedBy').references('id').inTable('buildtech.users');
      table.boolean('deleted').notNullable().defaultTo(false);
      table.timestamps(true, true);
    });
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('planD.adminAccess')
    .dropTableIfExists('planD.adminUserTypeAccess')
    .dropTableIfExists('planD.adminUserTypes');
};
