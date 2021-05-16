const getPDUser = require('../../modules/getPDUserFromBTUser');
const CompanyStaff = require('../../db/models/CompanyStaff');
const Feature = require('../../db/models/Feature');
const AdminAccess = require('../../db/models/AdminAccess');
const AdminUserTypeAccess = require('../../db/models/AdminUserTypeAccess');
const LeaveRequest = require('../../db/models/LeaveRequest');
const UserTypeAction = require('../../db/models/UserTypeAction');
const isEmpty = require('is-empty');
const isUUID = require('../../modules/isUUID');

const editRequest = async (req, res) => {
  try {
    const { userId: btUserId } = req;
    const { id: requestId } = req.params;
    const companyId = req.headers['b_company'];
    const {
      type,
      startDate,
      endDate,
      hourlyDate,
      startTime,
      endTime,
      description,
      staffId,
    } = req.body;

    if (
      type === undefined ||
      startDate === undefined ||
      endDate === undefined ||
      hourlyDate === undefined ||
      startTime === undefined ||
      endTime === undefined ||
      description === undefined ||
      staffId === undefined ||
      requestId === undefined ||
      companyId === undefined ||
      isEmpty(companyId) ||
      !isUUID(requestId) ||
      !isUUID(companyId) ||
      !btUserId ||
      isEmpty(btUserId) ||
      !isUUID(btUserId)
    )
      return res.sendStatus(422);

    const { errors, isValid } = validateEntries({
      requestId,
      type,
      startDate,
      endDate,
      hourlyDate,
      startTime,
      endTime,
      description,
      staffId,
    });
    if (!isValid)
      return res.status(400).json({ errors: { type: 'validation', errors } });

    const data = {
      type,
      startDate,
      endDate,
      hourlyDate,
      startTime,
      endTime,
      description,
      staffId,
      updatedBy: btUserId,
    };

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

        const result = await LeaveRequest.query().patchAndFetchById(
          requestId,
          data
        );

        return res.status(200).json({
          result,
        });
      } else if (!isEmpty(isStaff)) {
        const featureAccess = await UserTypeAction.query()
          .select('id', 'permission', 'type')
          .findOne('userTypeId', isStaff.userTypeId)
          .where('featureId', feature.id)
          .where('type', 'edit')
          .where('deleted', false);
        if (isEmpty(featureAccess)) return res.sendStatus(403);

        const request = await LeaveRequest.query()
          .findById(requestId)
          .where('deleted', false);
        if (isEmpty(request)) return res.sendStatus(404);

        const { permission } = featureAccess;
        if (permission === 'self' && request.staffId !== isStaff.id)
          return res.sendStatus(403);

        const result = await LeaveRequest.query().patchAndFetchById(
          requestId,
          data
        );

        return res.status(200).json({
          result,
        });
      } else res.sendStatus(500);
    }
  } catch (err) {
    res.status(500).json({});
  }
};

const validateEntries = ({
  requestId,
  type,
  startDate,
  endDate,
  hourlyDate,
  startTime,
  endTime,
  staffId,
}) => {
  const errors = {};

  if (isEmpty(requestId)) errors.requestId = 'درخواست انتخاب نشده است';
  if (isEmpty(type)) {
    errors.type = 'نوع درخواست را انتخاب انتخاب کنید';
    if (isEmpty(startTime)) errors.startTime = 'ساعت شروع را انتخاب کنید';
    if (isEmpty(endTime)) errors.endTime = 'ساعت پایان را انتخاب کنید';
    if (isEmpty(hourlyDate)) errors.hourlyDate = 'تاریخ را انتخاب کنید';
    if (isEmpty(startDate)) errors.startDate = 'تاریخ شروع را انتخاب کنید';
    if (isEmpty(endDate)) errors.endDate = 'تاریخ پایان را انتخاب کنید';
  } else {
    if (type === 'daily') {
      if (isEmpty(startDate)) errors.startDate = 'تاریخ شروع را انتخاب کنید';
      if (isEmpty(endDate)) errors.endDate = 'تاریخ پایان را انتخاب کنید';
    }
    if (type === 'hourly') {
      if (isEmpty(startTime)) errors.startTime = 'ساعت شروع را انتخاب کنید';
      if (isEmpty(endTime)) errors.endTime = 'ساعت پایان را انتخاب کنید';
      if (isEmpty(hourlyDate)) errors.hourlyDate = 'تاریخ را انتخاب کنید';
    }
  }
  if (isEmpty(staffId)) errors.staffId = 'کارمند را انتخاب کنید';

  const isValid = isEmpty(errors);

  return { errors, isValid };
};

module.exports = editRequest;
