const { Model } = require('objection');
const BtUser = require('./BTUser');
const Project = require('./Project');

class BTProject extends Model {
  static tableName = 'buildtech.projects';

  static relationMappings = {
    pdProject: {
      relation: Model.HasManyRelation,
      modelClass: Project,
      join: {
        from: 'buildtech.projects.id',
        to: 'planD.projects.btProjectId',
      },
    },
    creationBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: BtUser,
      join: {
        from: 'buildtech.projects.createdBy',
        to: 'buildtech.users.id',
      },
    },
    updateBy: {
      relation: Model.BelongsToOneRelation,
      modelClass: BtUser,
      join: {
        from: 'buildtech.projects.updatedBy',
        to: 'buildtech.users.id',
      },
    },
  };
}

module.exports = BTProject;
