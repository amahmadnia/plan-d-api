const { Model } = require('objection');
const BtUser = require('./BTUser');
const Company = require('./Company');

class BTCompany extends Model {
  static tableName = 'buildtech.companies';

  static relationMappings = {
    pdCompany: {
      relation: Model.HasManyRelation,
      modelClass: Company,
      join: {
        from: 'buildtech.companies.id',
        to: 'planD.companies.btCompanyId',
      },
    },
    creationBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: BtUser,
      join: {
        from: 'buildtech.companies.createdBy',
        to: 'buildtech.users.id',
      },
    },
    updateBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: BtUser,
      join: {
        from: 'buildtech.companies.updatedBy',
        to: 'buildtech.users.id',
      },
    },
  };
}

module.exports = BTCompany;
