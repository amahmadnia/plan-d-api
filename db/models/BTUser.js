const { Model } = require('objection');
const PdUser = require('./User');

class BTUser extends Model {
  static tableName = 'buildtech.users';

  static relationMappings = {
    pdUser: {
      relation: Model.HasOneRelation,
      modelClass: PdUser,
      join: {
        from: 'buildtech.users.id',
        to: 'planD.users.btUserId',
      },
    },
  };
}

module.exports = BTUser;
