const uuid = require('uuid');
const { find, add, remove, update, addMany } = require('../../helpers/mongoHelper');
const { getTeacherSchema } = require('../../helpers/schemas');
const { filterData } = require('../../helpers/utils');
const { COLLECTION: { TEACHERS }} = require('../../helpers/constants');
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
      throw new Error('Teacher already exists');
    }
    teacher['teacherId'] = uuid();
    teacher['_id'] = teacher['teacherId'];
    console.log('teacher', teacher);
    let addTeacherRes = await add(TEACHERS, {...getTeacherSchema(), ...teacher});
    return addTeacherRes;
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.updateTeacher = async (teacher) => {
  try {
    let res = await update(TEACHERS, {teacherId: teacher.teacherId}, {"$set": teacher})
    if (res.result.ok >= 1) {
      return teacher;
    } else {
      throw new Error('Teacher was not updated');
    }
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
      teachers[i].teacherId = uuid();
      teacherMap[teacherIndex] = teachers[i].teacherId;
    }
    let teachersRes = [];
    if (teachers.length) {
      teacherRes = await addMany(TEACHERS, teachers);
    }

    console.log('teachersRes', teachersRes);
    return {teachersRes, teacherMap};
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
