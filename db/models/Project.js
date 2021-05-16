const { Model } = require('objection');
const BtUser = require('./BTUser');
const BTProject = require('./BTProject');
const Company = require('./Company');
const ProjectVH = require('./ProjectVH');
const ProjectTeam = require('./ProjectTeam');

class Project extends Model {
  static tableName = 'planD.projects';

  static relationMappings = {
    btProject: {
      relation: Model.BelongsToOneRelation,
      modelClass: BTProject,
      join: {
        from: 'planD.projects.btProjectId',
        to: 'buildtech.projects.id',
      },
    },
    company: {
      relation: Model.BelongsToOneRelation,
      modelClass: Company,
      join: {
        from: 'planD.projects.companyId',
        to: 'planD.companies.id',
      },
    },
    versionHistory: {
      relation: Model.HasManyRelation,
      modelClass: ProjectVH,
      join: {
        from: 'planD.projects.id',
        to: 'planD.projectsVersionHistory.projectId',
      },
    },
    projectTeam: {
      relation: Model.HasManyRelation,
      modelClass: ProjectTeam,
      join: {
        from: 'planD.projects.id',
        to: 'planD.projectTeam.projectId',
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

module.exports = Project;
