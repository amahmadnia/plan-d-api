const { Model } = require('objection');
const BtUser = require('./BTUser');
const Company = require('./Company');
const AdminUserType = require('./AdminUserType');
const User = require('./User');

class AdminAccess extends Model {
  static tableName = 'planD.adminAccess';

  static relationMappings = {
    adminUserType: {
      relation: Model.BelongsToOneRelation,
      modelClass: AdminUserType,
      join: {
        from: 'planD.adminAccess.userTypeId',
        to: 'planD.adminUserTypes.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'planD.adminAccess.userId',
        to: 'planD.users.id',
      },
    },
    company: {
      relation: Model.BelongsToOneRelation,
      modelClass: Company,
      join: {
        from: 'planD.adminAccess.companyId',
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

module.exports = AdminAccess;
