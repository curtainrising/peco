const uuid = require('uuid');
const { GraphQLError } = require('graphql');
const { find, add, remove, update, updateAndReturn, addMany, getObjectId } = require('../../helpers/mongoHelper');
const { getTeacherSchema } = require('../../helpers/schemas');
const { filterData, createRegexQuery } = require('../../helpers/utils');
const { COLLECTION: { TEACHERS }, ERRORS} = require('../../helpers/constants');
const logger = require('../../helpers/logger').init('Teacher Control');

const findTeacher = async (data) => {
  try {
    return find(TEACHERS, data);
  } catch (e) {
    throw e;
  }
}

exports.createTeacher = async (teacher) => {
  try {
    const teacherRes = findTeacher({teacherId: teacher.teacherId});
    if (teacherRes.length >= 1) {
      throw new GraphQLError(
        ERRORS.TEACHER_EXISTS,
        {
          extensions: {
            code: ERRORS.TEACHER_EXISTS,
          }
        }
      );
    }
    teacher['_id'] = getObjectId();
    teacher['teacherId'] = teacher['_id'].toString();
    let addTeacherRes = await add(TEACHERS, {...getTeacherSchema(), ...teacher});
    if (!addTeacherRes || !addTeacherRes.acknowledged) {
      throw new GraphQLError(
        ERRORS.UNKOWN_ERROR,
        {
          extensions: {
            code: ERRORS.UNKOWN_ERROR,
          }
        }
      );
    }
    let addedTeacher = await findTeacher({_id: teacher['_id']});
    return addedTeacher[0];
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.updateTeacher = async (teacher) => {
  try {
    let res = await updateAndReturn(TEACHERS, {teacherId: teacher.teacherId}, {"$set": teacher})
    return res;
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.getTeachers = async (findData) => {
  try {
    return findTeacher(findData);
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.deleteTeacher = async ({teacherId}) => {
  try {
    let teacherRes = remove(TEACHERS, {teacherId});
    return {teacherId};
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.uploadTeachers = async (teachers) => {
  try {
    const teacherMap = {};
    for (let i = 0; i < teachers.length; i++) {
      let teacherIndex = teachers[i].teacherId;
      teachers[i]['_id'] = getObjectId();
      teachers[i].teacherId = teachers[i]['_id'].toString();
      teacherMap[teacherIndex] = teachers[i].teacherId;
    }
    let teachersRes = [];
    if (teachers.length) {
      teachersRes = await addMany(TEACHERS, teachers);
    }

    let teacherData = [];
    if (teachersRes && teachersRes.acknowledged) {
      let teacherIdRegex = createRegexQuery(teachers, 'teacherId');
      teacherData = await findTeacher({teacherId: new RegExp(teacherIdRegex)});
    }
    
    return {teachersRes: teacherData, teacherMap};
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

const getTeacherGraphqlSchema = (teacher) => ({
  firstName: () => teacher.firstName,
  lastName: () => teacher.lastName,
  email: () => teacher.email,
  teacherId: () => teacher.teacherId,
  schoolId: () => teacher.schoolId,
})

exports.getTeacherGraphqlSchema = (teacher) => ({
  teacher: () => getTeacherGraphqlSchema(teacher)
});
exports.getGraphqlSchema = (teachers) => {
  return {
    teachers: () => teachers.map(teacher => getTeacherGraphqlSchema(teacher)) || []
  }
}
