const { Model } = require('objection');
const BtUser = require('./BTUser');
const User = require('./User');
const CompanyVH = require('./CompanyVH');
const CompanyStaff = require('./CompanyStaff');
const Project = require('./Project');
const ProjectVH = require('./ProjectVH');
const UserType = require('./UserType');

class Company extends Model {
  static tableName = 'planD.companies';

  static relationMappings = {
    btCompany: {
      relation: Model.BelongsToOneRelation,
      modelClass: BtUser,
      join: {
        from: 'planD.users.btUserId',
        to: 'buildtech.users.id',
      },
    },
    user: {
      relation: Model.ManyToManyRelation,
      modelClass: User,
      join: {
        from: 'planD.companies.id',
        through: {
          from: 'planD.companyStaff.companyId',
          to: 'planD.companyStaff.userId',
        },
        to: 'planD.users.id',
      },
    },
    versionHistory: {
      relation: Model.HasManyRelation,
      modelClass: CompanyVH,
      join: {
        from: 'planD.companies.id',
        to: 'planD.companiesVersionHistory.companyId',
      },
    },
    staff: {
      relation: Model.HasManyRelation,
      modelClass: CompanyStaff,
      join: {
        from: 'planD.companies.id',
        to: 'planD.companyStaff.companyId',
      },
    },
    project: {
      relation: Model.HasManyRelation,
      modelClass: Project,
      join: {
        from: 'planD.companies.id',
        to: 'planD.projects.companyId',
      },
    },
    projectVH: {
      relation: Model.HasManyRelation,
      modelClass: ProjectVH,
      join: {
        from: 'planD.companies.id',
        to: 'planD.projectsVersionHistory.companyId',
      },
    },
    userType: {
      relation: Model.HasManyRelation,
      modelClass: UserType,
      join: {
        from: 'planD.companies.id',
        to: 'planD.userTypes.companyId',
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

module.exports = Company;
