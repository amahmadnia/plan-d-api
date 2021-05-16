const { Model } = require('objection');
const BtUser = require('./BTUser');
const AdminUserTypeAccess = require('./AdminUserTypeAccess');

class AdminUserType extends Model {
  static tableName = 'planD.adminUserTypes';

  static relationMappings = {
    adminUserTypeAccess: {
      relation: Model.HasManyRelation,
      modelClass: AdminUserTypeAccess,
      join: {
        from: 'planD.adminUserTypes.id',
        to: 'planD.adminUserTypeAccess.userTypeId',
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

module.exports = AdminUserType;
