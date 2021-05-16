exports.seed = async function (knex) {
  // truncate all existing tables

  await knex.raw('truncate table plan_d.admin_user_types cascade');
  await knex.raw('truncate table plan_d.admin_user_type_access cascade');
  await knex.raw('truncate table plan_d.admin_access cascade');

  await knex('planD.adminUserTypes').insert([
    {
      id: '076e9862-c69c-43cc-9fca-44cc7013e53d',
      name: 'aus1',
    },
    {
      id: 'c71d31a8-0825-4711-98da-b6aae34154b7',
      name: 'aus1',
    },
    {
      id: 'c777972b-fda2-4049-9388-84000473ed2b',
      name: 'aus1',
    },
  ]);

  await knex('planD.adminUserTypeAccess').insert([
    {
      userTypeId: '076e9862-c69c-43cc-9fca-44cc7013e53d',
      featureId: '86dadf87-8256-4057-87aa-d61ff939149a',
    },
    {
      userTypeId: '076e9862-c69c-43cc-9fca-44cc7013e53d',
      featureId: '76b52f3e-3db9-4a49-b273-35e4295a76a9',
    },
    {
      userTypeId: '076e9862-c69c-43cc-9fca-44cc7013e53d',
      featureId: '210620fb-a777-4810-a847-cf1bc9c8c50a',
    },
  ]);

  await knex('planD.adminAccess').insert([
    {
      id: 'dbb3ef35-0662-4a4d-ab58-d4eedf08e40c',
      userId: '20e2da0d-a8f4-4e99-adc1-165748b146fa',
      userTypeId: '076e9862-c69c-43cc-9fca-44cc7013e53d',
      companyId: 'af889c13-4e90-4aae-99f9-391fc793ada1',
    },
    {
      id: '181cc7fc-b862-47b9-a993-ef1f0481f680',
      userId: '20e2da0d-a8f4-4e99-adc1-165748b146fa',
      userTypeId: '076e9862-c69c-43cc-9fca-44cc7013e53d',
      companyId: '771960fa-61db-4ca1-9f2b-9c8343402b7d',
    },
    {
      id: 'fa995bc2-1b4d-4f48-a3b7-cac053ba5e46',
      userId: '20e2da0d-a8f4-4e99-adc1-165748b146fa',
      userTypeId: 'c71d31a8-0825-4711-98da-b6aae34154b7',
      companyId: 'e1cb6145-c966-4fb1-b8fe-417d0a92b214',
    },
  ]);
};
