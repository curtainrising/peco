const uuid = require('uuid');
const { find, add, remove, update } = require('../../helpers/mongoHelper');
const { getClassSchema } = require('../../helpers/schemas');
const { filterData } = require('../../helpers/utils');
const { COLLECTION: { CLASSES }} = require('../../helpers/constants');
const logger = require('../../helpers/logger').init('Class Control');

const findClass = async (data) => {
  try {
    return find(CLASSES, data);
  } catch (e) {
    throw e;
  }
}

exports.createClass = async (classData) => {
  console.log('classData', classData);
  try {
    const classRes = findClass({classId: classData.classId});
    if (classRes.length >= 1) {
      throw new Error('Class already exists');
    }
    classData['classId'] = uuid();
    classData['_id'] = classData['classId'];
    let addClassData = await add(CLASSES, {...getClassSchema(), ...classData});
    console.log('addClassData', addClassData);
    return addClassData;
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.updateClass = async (classData) => {
  try {
    let res = await update(CLASSES, {classId: classData.classId}, {"$set": classData})
    if (res.result.ok >= 1) {
      return classData;
    } else {
      throw new Error('Class was not updated');
    }
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
