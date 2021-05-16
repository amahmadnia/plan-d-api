const { Model } = require('objection');
const BtUser = require('./BTUser');
const UserType = require('./UserType');
const Feature = require('./Feature');

class UserTypeAction extends Model {
  static tableName = 'planD.userTypeActions';

  static relationMappings = {
    userType: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserType,
      join: {
        from: 'planD.userTypeActions.userTypeId',
        to: 'planD.userTypes.id',
      },
    },
    feature: {
      relation: Model.BelongsToOneRelation,
      modelClass: Feature,
      join: {
        from: 'planD.userTypeActions.featureId',
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

module.exports = UserTypeAction;
