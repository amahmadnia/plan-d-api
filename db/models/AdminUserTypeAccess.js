const { Model } = require('objection');
const BtUser = require('./BTUser');
const AdminUserType = require('./AdminUserType');
const Feature = require('./Feature');

class AdminUserTypeAccess extends Model {
  static tableName = 'planD.adminUserTypeAccess';

  static relationMappings = {
    adminUserType: {
      relation: Model.BelongsToOneRelation,
      modelClass: AdminUserType,
      join: {
        from: 'planD.adminUserTypeAccess.userTypeId',
        to: 'planD.adminUserTypes.id',
      },
    },
    feature: {
      relation: Model.BelongsToOneRelation,
      modelClass: Feature,
      join: {
        from: 'planD.adminUserTypeAccess.featureId',
        to: 'planD.features.id',
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

module.exports = AdminUserTypeAccess;
