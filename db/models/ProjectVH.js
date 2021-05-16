const { Model } = require('objection');
const BtUser = require('./BTUser');
const BTProject = require('./BTProject');
const Company = require('./Company');
const Project = require('./Project');

class ProjectVH extends Model {
  static tableName = 'planD.projectsVersionHistory';

  static relationMappings = {
    btProject: {
      relation: Model.BelongsToOneRelation,
      modelClass: BTProject,
      join: {
        from: 'planD.projects.btProjectId',
        to: 'buildtech.projects.id',
      },
    },
    project: {
      relation: Model.BelongsToOneRelation,
      modelClass: Project,
      join: {
        from: 'planD.projectsVersionHistory.projectId',
        to: 'planD.projects.id',
      },
    },
    company: {
      relation: Model.BelongsToOneRelation,
      modelClass: Company,
      join: {
        from: 'planD.companyStaff.companyId',
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
  };
}

module.exports = ProjectVH;
