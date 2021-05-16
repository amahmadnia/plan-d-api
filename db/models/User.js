const { Model } = require('objection');
const BtUser = require('./BTUser');
const CompanyStaff = require('./CompanyStaff');
const Company = require('./Company');
const UserVH = require('./UserVH');
const AdminAccess = require('./AdminAccess');

class User extends Model {
  static tableName = 'planD.users';

  static relationMappings = {
    btUsers: {
      relation: Model.BelongsToOneRelation,
      modelClass: BtUser,
      join: {
        from: 'planD.users.btUserId',
        to: 'buildtech.users.id',
      },
    },
    company: {
      relation: Model.ManyToManyRelation,
      modelClass: Company,
      join: {
        from: 'planD.users.id',
        through: {
          from: 'planD.companyStaff.userId',
          to: 'planD.companyStaff.companyId',
        },
        to: 'planD.companies.id',
      },
    },
    staff: {
      relation: Model.HasManyRelation,
      modelClass: CompanyStaff,
      join: {
        from: 'planD.users.id',
        to: 'planD.companyStaff.userId',
      },
    },
    versionHistory: {
      relation: Model.HasManyRelation,
      modelClass: UserVH,
      join: {
        from: 'planD.users.id',
        to: 'planD.usersVersionHistory.userId',
      },
    },
    adminAccess: {
      relation: Model.HasManyRelation,
      modelClass: AdminAccess,
      join: {
        from: 'planD.users.id',
        to: 'planD.adminAccess.userId',
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

module.exports = User;
