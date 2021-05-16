const User = require('../../db/models/User');
const isEmpty = require('is-empty');

const getUserId = async (btUserId) => {
  try {
    const userIdTemp = await User.query()
      .select('id')
      .findOne('btUserId', btUserId)
      .where('deleted', false);
    if (isEmpty(userIdTemp)) return 404;
    const { id } = userIdTemp;
    return id;
  } catch (err) {
    return 500;
  }
};

module.exports = getUserId;
