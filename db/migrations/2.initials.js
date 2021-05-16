exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return (
    knex.schema
      .raw('CREATE SCHEMA IF NOT EXISTS plan_d')
      .withSchema('plan_d')
      // Companies
      .createTable('companies', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('status').notNullable();
        table.integer('monthlyUploadLimit').notNullable();
        table.integer('maxUploadSize').notNullable();
        table
          .uuid('btCompanyId')
          .notNullable()
          .references('id')
          .inTable('buildtech.companies');
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
      // Companies Version History
      .createTable('companiesVersionHistory', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('status').notNullable();
        table.integer('monthlyUploadLimit').notNullable();
        table.integer('maxUploadSize').notNullable();
        table
          .uuid('btCompanyId')
          .notNullable()
          .references('id')
          .inTable('buildtech.companies');
        table
          .uuid('companyId')
          .references('id')
          .inTable('planD.companies')
          .notNullable();
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.integer('versionNo').notNullable();
        table.timestamps(true, true);
      })
      // Users
      .createTable('users', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('status').notNullable();
        table
          .uuid('btUserId')
          .notNullable()
          .references('id')
          .inTable('buildtech.users');
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
      // Users Version History
      .createTable('usersVersionHistory', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('status').notNullable();
        table
          .uuid('btUserId')
          .notNullable()
          .references('id')
          .inTable('buildtech.users');
        table
          .uuid('userId')
          .notNullable()
          .references('id')
          .inTable('planD.users');
        table.integer('versionNo').notNullable();
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.timestamps(true, true);
      })
      // User Types
      .createTable('userTypes', (table) => {
        table.uuid('id').notNullable().primary();
        table
          .uuid('companyId')
          .notNullable()
          .references('id')
          .inTable('planD.companies')
          .notNullable();
        table.string('name').notNullable();
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
      // Features
      .createTable('features', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('name').notNullable();
        table.string('title').notNullable();
        table.string('category').notNullable();
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
      // UserType Actions
      .createTable('userTypeActions', (table) => {
        table.uuid('id').notNullable().primary();
        table
          .uuid('userTypeId')
          .notNullable()
          .references('id')
          .inTable('planD.userTypes')
          .notNullable();
        table
          .uuid('featureId')
          .notNullable()
          .references('id')
          .inTable('planD.features')
          .notNullable();
        table.string('type').notNullable(); //add, edit, ...
        table.string('permission').notNullable();
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
      // Company Staff
      .createTable('companyStaff', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('status').notNullable();
        table
          .uuid('userTypeId')
          .notNullable()
          .references('id')
          .inTable('planD.userTypes');
        table
          .uuid('userId')
          .notNullable()
          .references('id')
          .inTable('planD.users');
        table
          .uuid('companyId')
          .notNullable()
          .references('id')
          .inTable('planD.companies');
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
      // Projects
      .createTable('projects', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('name').notNullable();
        table.string('status').notNullable();
        table.integer('initialProgress').notNullable();
        table.integer('actualStart');
        table
          .uuid('btProjectId')
          .notNullable()
          .references('id')
          .inTable('buildtech.projects');
        table
          .uuid('companyId')
          .notNullable()
          .references('id')
          .inTable('planD.companies');
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
      // Projects Version History
      .createTable('projectsVersionHistory', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('name').notNullable();
        table.string('status').notNullable();
        table.integer('initialProgress').notNullable();
        table.integer('actualStart');
        table
          .uuid('btProjectId')
          .notNullable()
          .references('id')
          .inTable('buildtech.projects');
        table
          .uuid('companyId')
          .notNullable()
          .references('id')
          .inTable('planD.companies');
        table
          .uuid('projectId')
          .notNullable()
          .references('id')
          .inTable('planD.projects');
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.timestamps(true, true);
      })
      // Project Team
      .createTable('projectTeam', (table) => {
        table.uuid('id').notNullable().primary();
        table
          .uuid('staffId')
          .notNullable()
          .references('id')
          .inTable('planD.companyStaff');
        table
          .uuid('projectId')
          .notNullable()
          .references('id')
          .inTable('planD.projects');
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('planD.projectTeam')
    .dropTableIfExists('planD.projectsVersionHistory')
    .dropTableIfExists('planD.projects')
    .dropTableIfExists('planD.companyStaff')
    .dropTableIfExists('planD.userTypeActions')
    .dropTableIfExists('planD.features')
    .dropTableIfExists('planD.userTypes')
    .dropTableIfExists('planD.usersVersionHistory')
    .dropTableIfExists('planD.users')
    .dropTableIfExists('planD.companiesVersionHistory')
    .dropTableIfExists('planD.companies');
};
