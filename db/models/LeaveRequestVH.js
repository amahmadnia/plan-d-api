const { Model } = require('objection');
const BtUser = require('./BTUser');
const CompanyStaff = require('./CompanyStaff');
const LeaveRequest = require('./LeaveRequest');

class LeaveRequestVH extends Model {
  static tableName = 'planD.leaveRequestsVersionHistory';

  static relationMappings = {
    staff: {
      relation: Model.BelongsToOneRelation,
      modelClass: CompanyStaff,
      join: {
        from: 'planD.leaveRequests.staffId',
        to: 'planD.companyStaff.id',
      },
    },
    request: {
      relation: Model.BelongsToOneRelation,
      modelClass: LeaveRequest,
      join: {
        from: 'planD.leaveRequestsVersionHistory.requestId',
        to: 'planD.leaveRequests.id',
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

module.exports = LeaveRequestVH;
