const { Model } = require('objection');
const BtUser = require('./BTUser');
const UserType = require('./UserType');
const User = require('./User');
const Company = require('./Company');
const ProjectTeam = require('./ProjectTeam');
const LeaveRequest = require('./LeaveRequest');

class CompanyStaff extends Model {
  static tableName = 'planD.companyStaff';

  static relationMappings = {
    userType: {
      relation: Model.BelongsToOneRelation,
      modelClass: UserType,
      join: {
        from: 'planD.companyStaff.userTypeId',
        to: 'planD.userTypes.id',
      },
    },
    user: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: 'planD.companyStaff.userId',
        to: 'planD.users.id',
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
    projectTeam: {
      relation: Model.HasManyRelation,
      modelClass: ProjectTeam,
      join: {
        from: 'planD.companyStaff.id',
        to: 'planD.projectTeam.staffId',
      },
    },
    leaveRequest: {
      relation: Model.HasManyRelation,
      modelClass: LeaveRequest,
      join: {
        from: 'planD.companyStaff.id',
        to: 'planD.leaveRequests.staffId',
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

module.exports = CompanyStaff;
