exports.up = async function (knex) {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

  return (
    knex.schema
      .withSchema('planD')
      .createTable('leaveRequests', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('type').notNullable();
        table.date('startDate');
        table.date('endDate');
        table.date('hourlyDate');
        table.time('startTime');
        table.time('endTime');
        table.text('description');
        table
          .uuid('staffId')
          .notNullable()
          .references('id')
          .inTable('plan_d.companyStaff');
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.uuid('updatedBy').references('id').inTable('buildtech.users');
        table.boolean('deleted').notNullable().defaultTo(false);
        table.timestamps(true, true);
      })
      // Leave Requests Version History
      .createTable('leaveRequestsVersionHistory', (table) => {
        table.uuid('id').notNullable().primary();
        table.string('type').notNullable();
        table.date('startDate');
        table.date('endDate');
        table.date('hourlyDate');
        table.time('startTime');
        table.time('endTime');
        table.text('description');
        table
          .uuid('staffId')
          .notNullable()
          .references('id')
          .inTable('plan_d.companyStaff');
        table
          .uuid('requestId')
          .notNullable()
          .references('id')
          .inTable('plan_d.leaveRequests');
        table.integer('versionNo').notNullable();
        table.uuid('createdBy').references('id').inTable('buildtech.users');
        table.timestamps(true, true);
      })
  );
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('planD.leaveRequestsVersionHistory')
    .dropTableIfExists('planD.leaveRequests');
};
