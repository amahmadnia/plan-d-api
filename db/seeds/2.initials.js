exports.seed = async function (knex) {
  // truncate all existing tables

  await knex.raw('truncate table plan_d.companies cascade');
  await knex.raw('truncate table plan_d.users cascade');
  await knex.raw('truncate table plan_d.user_types cascade');
  await knex.raw('truncate table plan_d.features cascade');
  await knex.raw('truncate table plan_d.user_type_actions cascade');
  await knex.raw('truncate table plan_d.company_staff cascade');
  await knex.raw('truncate table plan_d.projects cascade');
  await knex.raw('truncate table plan_d.project_team cascade');

  // Companies
  await knex('planD.companies').insert([
    {
      id: 'af889c13-4e90-4aae-99f9-391fc793ada1',
      status: 'company1',
      monthlyUploadLimit: 10,
      maxUploadSize: 4,
      btCompanyId: '4739e185-084e-4785-b33a-4acd4803a016',
    },
    {
      id: '771960fa-61db-4ca1-9f2b-9c8343402b7d',
      status: 'company2',
      monthlyUploadLimit: 20,
      maxUploadSize: 19,
      btCompanyId: '94b58033-7e08-496c-989e-56c5302a3104',
    },
    {
      id: 'e1cb6145-c966-4fb1-b8fe-417d0a92b214',
      status: 'company3',
      monthlyUploadLimit: 30,
      maxUploadSize: 56,
      btCompanyId: '4dbdcc04-5469-4969-8cdb-cbedcb90d18f',
    },
  ]);

  // Users
  await knex('planD.users').insert([
    {
      id: '20e2da0d-a8f4-4e99-adc1-165748b146fa',
      status: 'active',
      btUserId: '05c283b6-3ddb-44e2-a88d-5b5ff5e468cb',
    },
    {
      id: '7338d291-ea33-4c1c-9a63-58909664b68b',
      status: 'active',
      btUserId: '56a0ac2c-d9c1-4c58-886f-dd9d344ebbce',
    },
    {
      id: 'ab711a95-faf7-484b-ae98-9136336d37cd',
      status: 'active',
      btUserId: 'fa02ae88-b4ec-449f-8ff9-db1eee196b60',
    },
  ]);

  // User Types
  await knex('planD.userTypes').insert([
    {
      id: '29be01d3-d88c-43af-8cc2-12d5fd22618c',
      name: 'us1',
      companyId: 'af889c13-4e90-4aae-99f9-391fc793ada1',
    },
    {
      id: '0f666484-7807-46af-aef1-72e1c043385d',
      name: 'us2',
      companyId: 'af889c13-4e90-4aae-99f9-391fc793ada1',
    },
    {
      id: 'cc31fc88-ecc4-41aa-b7a9-ec14188e1025',
      name: 'us3',
      companyId: 'af889c13-4e90-4aae-99f9-391fc793ada1',
    },
  ]);

  // Features
  await knex('planD.features').insert([
    {
      id: '86dadf87-8256-4057-87aa-d61ff939149a',
      name: 'leave-request',
      title: 'ثبت مرخصی',
      category: 'category1',
    },
    {
      id: '76b52f3e-3db9-4a49-b273-35e4295a76a9',
      name: 'f1',
      title: 'title1',
      category: 'category1',
    },
    {
      id: '210620fb-a777-4810-a847-cf1bc9c8c50a',
      name: 'f2',
      title: 'title2',
      category: 'category1',
    },
  ]);

  // UserType Actions
  await knex('planD.userTypeActions').insert([
    {
      id: 'a2071fac-4fc4-4889-a417-322a50043b1a',
      userTypeId: '29be01d3-d88c-43af-8cc2-12d5fd22618c',
      featureId: '86dadf87-8256-4057-87aa-d61ff939149a',
      type: 'add',
      permission: 'self',
    },
    {
      id: '6751f6f9-4351-4ab1-8a76-bbf74a4b2d1c',
      userTypeId: '29be01d3-d88c-43af-8cc2-12d5fd22618c',
      featureId: '86dadf87-8256-4057-87aa-d61ff939149a',
      type: 'edit',
      permission: 'self',
    },
    {
      id: '3a172658-737a-400c-bb71-3db2e0e63c92',
      userTypeId: '29be01d3-d88c-43af-8cc2-12d5fd22618c',
      featureId: '86dadf87-8256-4057-87aa-d61ff939149a',
      type: 'delete',
      permission: 'self',
    },
    {
      id: '0212930a-be49-4fd0-a37c-94128270e0dd',
      userTypeId: '29be01d3-d88c-43af-8cc2-12d5fd22618c',
      featureId: '86dadf87-8256-4057-87aa-d61ff939149a',
      type: 'view',
      permission: 'self',
    },
  ]);

  // Company staff
  await knex('planD.companyStaff').insert([
    {
      id: 'fca8222f-c6c2-465e-9d68-4192d97f1c61',
      status: 'active',
      userTypeId: '29be01d3-d88c-43af-8cc2-12d5fd22618c',
      userId: '20e2da0d-a8f4-4e99-adc1-165748b146fa',
      companyId: 'af889c13-4e90-4aae-99f9-391fc793ada1',
    },
    {
      id: '826a8567-129e-40ff-939a-fe3209fbd812',
      status: 'active',
      userTypeId: '29be01d3-d88c-43af-8cc2-12d5fd22618c',
      userId: '7338d291-ea33-4c1c-9a63-58909664b68b',
      companyId: 'af889c13-4e90-4aae-99f9-391fc793ada1',
    },
    {
      id: '59a1115b-29aa-42d2-8f3e-728414600d2f',
      status: 'active',
      userTypeId: '29be01d3-d88c-43af-8cc2-12d5fd22618c',
      userId: 'ab711a95-faf7-484b-ae98-9136336d37cd',
      companyId: 'af889c13-4e90-4aae-99f9-391fc793ada1',
    },
  ]);

  // Projects
  await knex('planD.projects').insert([
    {
      id: '2aca4ccd-144f-4d8d-a836-b14d859d48d4',
      name: 'project1',
      status: 'in_progress',
      initialProgress: 10,
      actualStart: 10,
      btProjectId: 'bf60445b-5d8a-41b0-b921-9257417081c7',
      companyId: 'af889c13-4e90-4aae-99f9-391fc793ada1',
    },
    {
      id: 'f560a866-9477-431f-aa8e-f5b128be76f7',
      name: 'project2',
      status: 'in_progress',
      initialProgress: 10,
      actualStart: 10,
      btProjectId: '27889058-52ea-462d-acd6-eaf037445cb0',
      companyId: 'af889c13-4e90-4aae-99f9-391fc793ada1',
    },
    {
      id: 'a53d3a41-1b16-4e97-83ef-238a4a17f599',
      name: 'project3',
      status: 'in_progress',
      initialProgress: 10,
      actualStart: 10,
      btProjectId: 'bf60445b-5d8a-41b0-b921-9257417081c7',
      companyId: 'af889c13-4e90-4aae-99f9-391fc793ada1',
    },
  ]);

  // Project Team
  await knex('planD.projectTeam').insert([
    {
      id: '8ea9b579-8578-46bc-b6a4-e83349d39848',
      staffId: 'fca8222f-c6c2-465e-9d68-4192d97f1c61',
      projectId: '2aca4ccd-144f-4d8d-a836-b14d859d48d4',
    },
    {
      id: '92361ca1-db41-4979-9cef-65e011285dd7',
      staffId: '59a1115b-29aa-42d2-8f3e-728414600d2f',
      projectId: '2aca4ccd-144f-4d8d-a836-b14d859d48d4',
    },
    {
      id: '210a5079-960e-4af0-afe4-51a4a2bafa30',
      staffId: '826a8567-129e-40ff-939a-fe3209fbd812',
      projectId: '2aca4ccd-144f-4d8d-a836-b14d859d48d4',
    },
  ]);
};
