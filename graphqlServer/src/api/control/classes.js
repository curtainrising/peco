const uuid = require('uuid');
const { GraphQLError } = require('graphql');
const { find, add, remove, update, updateAndReturn, getObjectId } = require('../../helpers/mongoHelper');
const { getClassSchema } = require('../../helpers/schemas');
const { filterData } = require('../../helpers/utils');
const { COLLECTION: { CLASSES }, ERRORS} = require('../../helpers/constants');
const logger = require('../../helpers/logger').init('Class Control');

const findClass = async (data) => {
  try {
    return find(CLASSES, data);
  } catch (e) {
    throw e;
  }
}

exports.createClass = async (classData) => {
  try {
    const classRes = findClass({classId: classData.classId});
    if (classRes.length >= 1) {
      throw new GraphQLError(
        ERRORS.CLASS_EXISTS,
        {
          extensions: {
            code: ERRORS.CLASS_EXISTS,
          }
        }
      );
    }
    classData['_id'] = getObjectId();
    classData['classId'] = classData['_id'].toString();
    let addClassRes = await add(CLASSES, {...getClassSchema(), ...classData});
    if (!addClassRes || !addClassRes.acknowledged) {
      throw new GraphQLError(
        ERRORS.UNKOWN_ERROR,
        {
          extensions: {
            code: ERRORS.UNKOWN_ERROR,
          }
        }
      );
    }
    let addedClassData = await findClass({_id: classData['_id']});
    return addedClassData[0];
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.updateClass = async (classData) => {
  try {
    let res = await updateAndReturn(CLASSES, {classId: classData.classId}, {"$set": classData})
    return res;
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.getClasses = async (findData) => {
  try {
    return findClass(findData);
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.deleteClass = async ({classId}) => {
  try {
    let classRes = remove(CLASSES, {classId});
    return {classId};
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

const getClassGraphqlSchema = (classData) => {
  return {
    className: () => classData.className,
    classId: () => classData.classId,
    schoolId: () => classData.schoolId,
  }
}

exports.getClassGraphqlSchema = (classes) => ({
  "class": () => getClassGraphqlSchema(classes)
});
exports.getGraphqlSchema = (classes) => {
  return {
    classes: () => classes.map(classData => getClassGraphqlSchema(classData)) || []
  }
}
