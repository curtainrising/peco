const jwt = require('jsonwebtoken')
const { GraphQLError } = require( 'graphql');
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
    let authData = jwt.verify(authToken, constants.APP_SECRET);
    user = await userControl.getOwnUser(authData.userId);
    if (user.userId !== userId) {
      throw new GraphQLError(
        constants.ERRORS.UNAUHORIZED,
        {
          extensions: {
            code: constants.ERRORS.UNAUHORIZED,
          }
        }
      );
    }
  } catch (e) {
    if (e && e.extensions) throw e;
    else {
      throw new GraphQLError(
        e.message,
        {
          extensions: {
            code: constants.ERRORS.UNAUHORIZED,
          }
        }
      );
    }
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
