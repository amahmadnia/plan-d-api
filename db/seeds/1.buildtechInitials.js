exports.seed = async function (knex) {
  // truncate all existing tables

  await knex.raw('truncate table buildtech.users cascade');
  await knex.raw('truncate table buildtech.companies cascade');
  await knex.raw('truncate table buildtech.projects cascade');

  // BT USERS
  await knex('buildtech.users').insert([
    {
      id: 'fa02ae88-b4ec-449f-8ff9-db1eee196b60',
      firstName: 'u1',
      lastName: 'ul1',
      username: 'u1',
    },
    {
      id: '05c283b6-3ddb-44e2-a88d-5b5ff5e468cb',
      firstName: 'u2',
      lastName: 'ul2',
      username: 'u2',
    },
    {
      id: '56a0ac2c-d9c1-4c58-886f-dd9d344ebbce',
      firstName: 'u3',
      lastName: 'ul3',
      username: 'u3',
    },
  ]);
  // BT Companies
  await knex('buildtech.companies').insert([
    {
      id: '4739e185-084e-4785-b33a-4acd4803a016',
      name: 'company1',
    },
    {
      id: '94b58033-7e08-496c-989e-56c5302a3104',
      name: 'company2',
    },
    {
      id: '4dbdcc04-5469-4969-8cdb-cbedcb90d18f',
      name: 'company3',
    },
  ]);
  // BT Projects
  await knex('buildtech.projects').insert([
    {
      id: 'bf60445b-5d8a-41b0-b921-9257417081c7',
      landUse: 'landUse1',
      uniqueCode: '123',
      area: 12.3,
    },
    {
      id: '27889058-52ea-462d-acd6-eaf037445cb0',
      landUse: 'landUse2',
      uniqueCode: '2123',
      area: 42.3, 
    },
    {
      id: '42ded801-4b82-4f61-bc09-437f46fcc621',
      landUse: 'landUse3',
      uniqueCode: '13323',
      area: 56.3,
    },
  ]);
};
