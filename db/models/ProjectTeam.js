const { Model } = require('objection');
const BtUser = require('./BTUser');
const BTProject = require('./BTProject');
const Company = require('./Company');

class ProjectTeam extends Model {
  static tableName = 'planD.projectTeam';

  static relationMappings = {
    staff: {
      relation: Model.BelongsToOneRelation,
      modelClass: BTProject,
      join: {
        from: 'planD.projectTeam.staffId',
        to: 'planD.companyStaff.id',
      },
    },
    project: {
      relation: Model.BelongsToOneRelation,
      modelClass: BTProject,
      join: {
        from: 'planD.projectTeam.projectId',
        to: 'planD.projects.id',
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

module.exports = ProjectTeam;
