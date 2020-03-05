const uuid = require('uuid');
const { find, add, remove, update } = require('../../helpers/mongoHelper');
const schoolControl = require('./school');
const teacherControl = require('./teachers');
const classeControl = require('./classes');
const studentControl = require('./students');
const { getUserSchema } = require('../../helpers/schemas');
const { filterData } = require('../../helpers/utils');
const { COLLECTION: { USERS }} = require('../../helpers/constants');
const logger = require('../../helpers/logger').init('User Control');

const findUser = async (data) => {
  try {
    return find(USERS, data);
  } catch (e) {
    throw e;
  }
}

const filterUserData = (userData, userSchema, type = '') => {
  switch (type) {
    default:
      return filterData(userData, userSchema)
  }
}

exports.login = async (loginData) => {
  try {
    let userRes = await findUser({userName: loginData.userName});
    if (userRes.length !== 1) {
      throw new Error('does not match');
    }
    let temp = filterUserData(userRes[0], getUserSchema());
    return temp;
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}
exports.register = async (registerData) => {
  try {
    let findUserRes = await findUser({userName: registerData.userName});
    if (findUserRes.length >= 1) {
      throw new Error('User already exists');
    }
    registerData['userId'] = uuid();
    registerData['_id'] = registerData['userId'];
    let addUserRes = await add(USERS, {...getUserSchema(),...registerData});
    return filterUserData(addUserRes, getUserSchema());
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.getUser = async (userId) => {
  try {
    let userRes = await findUser({userId});
    if (userRes.length !== 1) {
      throw new Error('User does not exist');
    }
    return filterUserData(userRes[0], getUserSchema());
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }

}

exports.joinSchool = async (userId, schoolId, userData) => {
  try {
    let res = await update(USERS, {userId}, {"$set": {schoolId}})
    if (res.result.ok >= 1) {
      userData['schoolId'] = schoolId;
      return userData;
    } else {
      throw new Error('User was not updated');
    }
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

// Graphql
exports.getGraphqlSchema = ({user, authToken}) => {
  return {
    userName: () => user.userName,
    userId: () => user.userId,
    firstName: () => user.firstName,
    lastName: () => user.lastName,
    authToken: () => authToken,
    schoolId: () => user.schoolId,
  }
}
