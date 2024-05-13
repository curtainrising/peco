const uuid = require('uuid');
const { GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
const { find, add, remove, update, getObjectId, updateAndReturn } = require('../../helpers/mongoHelper');
const schoolControl = require('./school');
const teacherControl = require('./teachers');
const classeControl = require('./classes');
const studentControl = require('./students');
const { getUserSchema, getOwnUserSchema } = require('../../helpers/schemas');
const { filterData } = require('../../helpers/utils');
const { COLLECTION: { USERS }, ERRORS, APP_SECRET} = require('../../helpers/constants');
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
      throw new GraphQLError(
        ERRORS.NO_USER,
        {
          extensions: {
            code: ERRORS.NO_USER,
          }
        }
      );
    } else if (userRes[0].password !== loginData.password) {
      throw new GraphQLError(
        ERRORS.BAD_PASSWORD,
        {
          extensions: {
            code: ERRORS.BAD_PASSWORD,
          }
        }
      );
    }
    let user = userRes[0];
    if (!user.authToken) {
      user.authToken = jwt.sign({ userId: user.userId }, APP_SECRET);
    }
    let temp = filterUserData(userRes[0], getOwnUserSchema());
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
      throw new GraphQLError(
        ERRORS.USER_EXISTS,
        {
          extensions: {
            code: ERRORS.USER_EXISTS,
          }
        }
      );
    }
    const id = getObjectId();
    const authToken = jwt.sign({ userId: id.toString() }, APP_SECRET);
    registerData['userId'] = id.toString()
    registerData['_id'] = id;
    registerData['authToken'] = authToken;
    let addUserRes = await add(USERS, {...getUserSchema(),...registerData});
    let userRes = await findUser({userId: addUserRes.insertedId.toString()});
    return filterUserData(userRes[0], getOwnUserSchema());
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}
exports.getOwnUser = async (userId) => {
  try {
    let userRes = await findUser({userId});
    if (userRes.length !== 1) {
      throw new GraphQLError(
        ERRORS.NO_USER,
        {
          extensions: {
            code: ERRORS.NO_USER,
          }
        }
      );
    }
    return filterUserData(userRes[0], getOwnUserSchema());
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.joinSchool = async (userId, schoolId, userData) => {
  try {
    let res = await updateAndReturn(USERS, {userId}, {"$set": {schoolId}})
    if (res.schoolId === schoolId) {
      return res;
    } else {
      throw new GraphQLError(
        ERRORS.UNKOWN_ERROR,
        {
          extensions: {
            code: ERRORS.UNKOWN_ERROR,
          }
        }
      );
    }
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

// Graphql
exports.getGraphqlSchema = ({user}) => {
  return {
    userName: () => user.userName,
    userId: () => user.userId,
    firstName: () => user.firstName,
    lastName: () => user.lastName,
    authToken: () => user.authToken,
    schoolId: () => user.schoolId,
  }
}
