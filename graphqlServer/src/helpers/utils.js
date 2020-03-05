const jwt = require('jsonwebtoken')
const userControl = require('../api/control/user');
const constants = require('./constants');

const filterData = (data, schema) => {
  const filteredData = {};
  Object.keys(schema).forEach((item, index) => {
    filteredData[item] = data[item];
  })
  return filteredData;
}

const authenticate = async ({userId, authToken}) => {
  let user;
  try {
    user = await userControl.getUser(userId);
    let authData = jwt.verify(authToken, constants.APP_SECRET);
    if (user.userId !== userId) {
      throw new Error('not correct user');
    }
  } catch (e) {
    throw e;
  }
  return user;
}

const createRegexQuery = (arr, type) => {
  let ids = "";
  arr.forEach(({[type]: id}, index) => {
    ids += id;
    if (index + 1 < arr.length) ids += "|";
  });
  return new RegExp(ids);
}


module.exports = {
  filterData,
  authenticate,
  createRegexQuery
}
