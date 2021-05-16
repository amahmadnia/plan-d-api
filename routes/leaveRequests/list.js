const getPDUser = require('../../modules/getPDUserFromBTUser');
const CompanyStaff = require('../../db/models/CompanyStaff');
const Feature = require('../../db/models/Feature');
const AdminAccess = require('../../db/models/AdminAccess');
const AdminUserTypeAccess = require('../../db/models/AdminUserTypeAccess');
const LeaveRequest = require('../../db/models/LeaveRequest');
const UserTypeAction = require('../../db/models/UserTypeAction');
const isEmpty = require('is-empty');
const isUUID = require('../../modules/isUUID');
const getRequestsCompany = require('../../modules/getStaffRelatedCompany');

const listRequests = async (req, res) => {
  try {
    const { userId: btUserId } = req;
    const { type, limit, page } = req.query;
    const companyId = req.headers['b_company'];
    if (
      !limit ||
      isEmpty(limit) ||
      !page ||
      isEmpty(page) ||
      !type ||
      isEmpty(type) ||
      (type !== 'hourly' && type !== 'daily') ||
      !companyId ||
      isEmpty(companyId) ||
      (!isUUID(companyId) && companyId !== 'all') ||
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

      const result = {
        page: 0,
        totalPages: 0,
        limit: 0,
        totalItems: 0,
        data: [],
      };

      if (!isEmpty(isAdmin)) {
        if (companyId === 'all') {
          const adminCompanies = await AdminAccess.query()
            .select('companyId', 'userTypeId')
            .where('userId', userId)
            .where('deleted', false);
          if (isEmpty(adminCompanies)) return res.sendStatus(403);

          const accessedCompanies = [];
          for (let i = 0; i < adminCompanies.length; i++) {
            const { userTypeId, companyId } = adminCompanies[i];
            const userTypeAccess = await AdminUserTypeAccess.query()
              .select('featureId')
              .where('featureId', feature.id)
              .where('userTypeId', userTypeId)
              .where('deleted', false);
            if (!isEmpty(userTypeAccess)) {
              accessedCompanies.push(companyId);
            }
          }

          const currentStaff = CompanyStaff.query()
            .where('deleted', false)
            .whereIn('companyId', accessedCompanies);

          let requests;
          if (type == 'hourly')
            requests = await getHourlyRequests(currentStaff, +page, +limit);
          else requests = await getDailyRequests(currentStaff, +page, +limit);

          const requestWithCompany = await getRequestsCompany(requests.results);
          if (requestWithCompany === 500) return res.sendStatus(500);

          result.data = requestWithCompany;
          result.page = +page;
          result.limit = +limit;
          result.totalItems = requests.total;
          result.totalPages = Math.ceil(requests.total / +limit);

          res.status(200).json({
            result,
          });
        } else {
          const companyAccess = await AdminAccess.query()
            .findOne('userId', userId)
            .select('id', 'userTypeId')
            .where('companyId', companyId)
            .where('deleted', false);
          if (isEmpty(companyAccess)) return res.sendStatus(403);

          const featureAccess = await AdminUserTypeAccess.query()
            .findOne('userTypeId', companyAccess.userTypeId)
            .where('featureId', feature.id)
            .where('deleted', false);
          if (isEmpty(featureAccess)) return res.sendStatus(403);

          const currentStaff = CompanyStaff.query()
            .where('deleted', false)
            .where('companyId', companyId);

          let requests;
          if (type == 'hourly')
            requests = await getHourlyRequests(currentStaff, +page, +limit);
          else requests = await getDailyRequests(currentStaff, +page, +limit);

          const requestsWithCompany = await getRequestsCompany(
            requests.results
          );
          if (requestsWithCompany === 500) return res.sendStatus(500);

          result.data = requestsWithCompany;
          result.page = +page;
          result.limit = +limit;
          result.totalItems = requests.total;
          result.totalPages = Math.ceil(requests.total / +limit);

          return res.status(200).json({ result });
        }
      } else if (!isEmpty(isStaff)) {
        const userTypeAccess = await UserTypeAction.query()
          .findOne('userTypeId', isStaff.userTypeId)
          .select('id', 'permission', 'type')
          .where('type', 'view')
          .where('featureId', feature.id)
          .where('deleted', false);
        if (isEmpty(userTypeAccess)) return res.sendStatus(403);

        let requests = [];
        if (userTypeAccess.permission === 'self') {
          if (type === 'hourly') {
            requests = await LeaveRequest.query()
              .select(
                'id',
                'hourlyDate',
                'startTime',
                'endTime',
                'description',
                'staffId'
              )
              .where('type', 'hourly')
              .where('staffId', isStaff.id)
              .where('deleted', false)
              .page(+page, +limit)
              .orderBy('hourlyDate', 'desc');
          } else {
            requests = await LeaveRequest.query()
              .select(
                'id',
                'type',
                'startDate',
                'endDate',
                'description',
                'staffId'
              )
              .where('type', 'daily')
              .where('staffId', isStaff.id)
              .where('deleted', false)
              .page(+page, +limit)
              .orderBy('createdAt', 'desc');
          }
        } else {
          const currentStaff = await CompanyStaff.query()
            .where('companyId', companyId)
            .where('deleted', false);

          if (type === 'hourly') {
            requests = await LeaveRequest.query()
              .select(
                'id',
                'hourlyDate',
                'startTime',
                'endTime',
                'description',
                'staffId'
              )
              .where('type', 'hourly')
              .whereIn('staffId', currentStaff)
              .where('deleted', false)
              .page(+page, +limit)
              .orderBy('hourlyDate', 'desc');
          } else {
            requests = await LeaveRequest.query()
              .select(
                'id',
                'type',
                'startDate',
                'endDate',
                'description',
                'staffId'
              )
              .where('type', 'daily')
              .whereIn('staffId', currentStaff)
              .where('deleted', false)
              .page(+page, +limit)
              .orderBy('createdAt', 'desc');
          }
        }
        result.data = requests.results;
        result.page = +page;
        result.limit = +limit;
        result.totalItems = requests.total;
        result.totalPages = Math.ceil(requests.total / +limit);

        return res.json({ result });
      } else res.sendStatus(500);
    }
  } catch (err) {
    res.status(500).json();
  }
};

const getHourlyRequests = async (currentStaff, page, limit) => {
  try {
    const data = await CompanyStaff.relatedQuery('leaveRequest')
      .for(currentStaff)
      .select(
        'id',
        'hourlyDate',
        'startTime',
        'endTime',
        'description',
        'staffId'
      )
      .where('deleted', false)
      .where('type', 'hourly')
      .page(page, limit)
      .orderBy('hourlyDate', 'desc');

    return data;
  } catch (error) {
    return 500;
  }
};

const getDailyRequests = async (currentStaff, page, limit) => {
  try {
    const data = await CompanyStaff.relatedQuery('leaveRequest')
      .for(currentStaff)
      .select('id', 'type', 'startDate', 'endDate', 'description', 'staffId')
      .where('deleted', false)
      .where('type', 'daily')
      .page(page, limit)
      .orderBy('createdAt', 'desc');

    return data;
  } catch (error) {
    return 500;
  }
};

module.exports = listRequests;
