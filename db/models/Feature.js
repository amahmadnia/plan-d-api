const { Model } = require('objection');
const BtUser = require('./BTUser');
const Company = require('./Company');

class Feature extends Model {
  static tableName = 'planD.features';

  static relationMappings = {
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

module.exports = Feature;
