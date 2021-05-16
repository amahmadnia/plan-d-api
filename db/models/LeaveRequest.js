const { Model } = require('objection');

class LeaveRequest extends Model {
  static tableName = 'planD.leaveRequests';

  static get relationMappings() {
    const BtUser = require('./BTUser');
    const CompanyStaff = require('./CompanyStaff');

    return {
      staff: {
        relation: Model.BelongsToOneRelation,
        modelClass: CompanyStaff,
        join: {
          from: 'planD.leaveRequests.staffId',
          to: 'planD.companyStaff.id',
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
}

module.exports = LeaveRequest;
