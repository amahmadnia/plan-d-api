const { Model } = require('objection');
const BtUser = require('./BTUser');
const Company = require('./Company');

class CompanyVH extends Model {
  static tableName = 'planD.companiesVersionHistory';

  static relationMappings = {
    btCompany: {
      relation: Model.BelongsToOneRelation,
      modelClass: BtUser,
      join: {
        from: 'planD.users.btUserId',
        to: 'buildtech.users.id',
      },
    },
    company: {
      relation: Model.BelongsToOneRelation,
      modelClass: Company,
      join: {
        from: 'planD.companiesVersionHistory.companyId',
        to: 'planD.companies.id',
      },
    },
    creationBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: BtUser,
      join: {
        from: 'planD.users.createdBy',
        to: 'buildtech.users.id',
      },
    },
  };
}

module.exports = CompanyVH;
