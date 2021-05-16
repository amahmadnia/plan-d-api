const getPDUser = require('../../modules/getPDUserFromBTUser');
const CompanyStaff = require('../../db/models/CompanyStaff');
const Feature = require('../../db/models/Feature');
const AdminAccess = require('../../db/models/AdminAccess');
const AdminUserTypeAccess = require('../../db/models/AdminUserTypeAccess');
const LeaveRequest = require('../../db/models/LeaveRequest');
const UserTypeAction = require('../../db/models/UserTypeAction');
const isEmpty = require('is-empty');
const isUUID = require('../../modules/isUUID');

const deleteRequest = async (req, res) => {
  try {
    const { userId: btUserId } = req;
    const { id: requestId } = req.params;
    const companyId = req.headers['b_company'];

    if (
      !companyId ||
      isEmpty(companyId) ||
      !isUUID(companyId) ||
      !btUserId ||
      isEmpty(btUserId) ||
      !isUUID(btUserId)
    )
      return res.sendStatus(422);

    const userId = await getPDUser(btUserId);
    if (userId == 404 || userId == 500) return res.sendStatus(userId);
    else {
      const feature = await Feature.query()
        .select('id')
        .findOne('name', 'leave-request')
        .where('deleted', false);
      if (isEmpty(feature)) return res.sendStatus(500);

      const isAdmin = await AdminAccess.query()
        .select('id')
        .where('userId', userId)
        .where('deleted', false);

      let isStaff = null;
      if (companyId !== 'all')
        isStaff = await CompanyStaff.query()
          .findOne('userId', userId)
          .select('id', 'userTypeId')
          .where('companyId', companyId)
          .where('deleted', false);

      if (!isEmpty(isAdmin)) {
        const companyAccess = await AdminAccess.query()
          .select('id', 'userTypeId')
          .findOne('userId', userId)
          .where('companyId', companyId)
          .where('deleted', false);
        if (isEmpty(companyAccess)) return res.sendStatus(403);

        const featureAccess = await AdminUserTypeAccess.query()
          .select('userTypeId', 'featureId')
          .findOne('userTypeId', companyAccess.userTypeId)
          .where('featureId', feature.id)
          .where('deleted', false);
        if (isEmpty(featureAccess)) return res.sendStatus(403);

        const result = await LeaveRequest.query().patchAndFetchById(requestId, {
          deleted: true,
        });

        return res.status(200).json({
          result,
        });
      } else if (!isEmpty(isStaff)) {
        const featureAccess = await UserTypeAction.query()
          .select('id', 'permission', 'type')
          .findOne('userTypeId', isStaff.userTypeId)
          .where('featureId', feature.id)
          .where('type', 'delete')
          .where('deleted', false);
        if (isEmpty(featureAccess)) return res.sendStatus(403);

        const request = await LeaveRequest.query()
          .findById(requestId)
          .where('deleted', false);
        if (isEmpty(request)) return res.sendStatus(404);

        const { permission } = featureAccess;
        if (permission === 'self' && request.staffId !== isStaff.id)
          return res.sendStatus(403);

        const result = await LeaveRequest.query().patchAndFetchById(requestId, {
          deleted: true,
        });

        return res.status(200).json({
          result,
        });
      } else res.sendStatus(500);
    }
  } catch (err) {
    res.status(500).json({});
  }
};

module.exports = deleteRequest;
