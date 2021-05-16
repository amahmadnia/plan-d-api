const { Model } = require('objection');
const BtUser = require('./BTUser');
const Company = require('./Company');

class UserType extends Model {
  static tableName = 'planD.userTypes';

  static relationMappings = {
    company: {
      relation: Model.BelongsToOneRelation,
      modelClass: Company,
      join: {
        from: 'planD.userTypes.companyId',
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
    updateBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: BtUser,
      join: {
        from: 'planD.users.updatedBy',
        to: 'buildtech.users.id',
      },
    },
  };
}

module.exports = UserType;
