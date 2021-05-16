const { Model } = require('objection');
const BtUser = require('./BTUser');
const User = require('./User');

class UserVH extends Model {
  static tableName = 'planD.usersVersionHistory';

  static relationMappings = {
    btUsers: {
      relation: Model.BelongsToOneRelation,
      modelClass: BtUser,
      join: {
        from: 'planD.users.btUserId',
        to: 'buildtech.users.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'planD.usersVersionHistory.userId',
        to: 'planD.users.id',
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

module.exports = UserVH;
