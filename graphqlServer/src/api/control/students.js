const uuid = require('uuid');
const { GraphQLError } = require('graphql');
const { find, add, remove, update, updateAndReturn, addMany, getObjectId } = require('../../helpers/mongoHelper');
const { getStudentSchema } = require('../../helpers/schemas');
const { filterData, createRegexQuery } = require('../../helpers/utils');
const { COLLECTION: { STUDENTS }, ERRORS} = require('../../helpers/constants');
const logger = require('../../helpers/logger').init('Student Control');

const findStudent = async (data) => {
  try {
    return find(STUDENTS, data);
  } catch (e) {
    throw e;
  }
}

exports.createStudent = async (student, schoolId) => {
  try {
    const teacherRes = findStudent({studentId: student.studentId});
    if (teacherRes.length >= 1) {
      throw new GraphQLError(
        ERRORS.STUDENT_EXISTS,
        {
          extensions: {
            code: ERRORS.STUDENT_EXISTS,
          }
        }
      );
    }
    student['_id'] = getObjectId();
    student['studentId'] = student['_id'].toString();
    student['schoolId'] = schoolId;
    let addStudentRes = await add(STUDENTS, {...getStudentSchema(), ...student});
    if (!addStudentRes || !addStudentRes.acknowledged) {
      throw new GraphQLError(
        ERRORS.UNKOWN_ERROR,
        {
          extensions: {
            code: ERRORS.UNKOWN_ERROR,
          }
        }
      );
    }
    let addedStudent = await findStudent({_id: student['_id']});
    return addedStudent[0];
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.uploadStudents = async (students, schoolId, classId, teacherMap) => {
  try {
    let addStudents = [];
    let updatedStudents = [];
    for (let i = 0; i < students.length; i++) {
      students[i].teacherId = teacherMap[students[i].teacherId] || students[i].teacherId;
      students[i].schoolId = schoolId;
      students[i].classId = classId;
      if (students[i].studentId) {
        updatedStudents.push(students[i])
      } else {
        students[i]['_id']  = getObjectId();
        students[i].studentId = students[i]['_id'].toString();
        addStudents.push(students[i]);
      }
    }
    if (addStudents.length) {
      let addStudentRes = await addMany(STUDENTS, addStudents);
    }
    if (updatedStudents.length) {
      let promises = [];
      for (let i = 0; i < updatedStudents.length; i++) {
        promises.push(update(STUDENTS, {studentId: updatedStudents[i].studentId}, {"$set": updatedStudents[i]}));
      }
      let updatedStudentRes = await Promise.all(promises);
    }
    return students;
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.updateStudent = async (student) => {
  try {
    return await updateAndReturn(STUDENTS, {studentId: student.studentId}, {"$set": student});
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.updateStudents = async (students, changeData) => {
  try {
    let studentResults = [];
    if (students.addStudents && students.addStudents.length) {
      let addStudentIds = createRegexQuery(students.addStudents, 'studentId');
      let res = await update(STUDENTS, {studentId: new RegExp(addStudentIds)}, {"$set": changeData}, {multi: true});
      let res2 = await findStudent({"studentId": new RegExp(addStudentIds)});
      studentResults = [
        ...res2
      ]
    }
    if (students.removeStudents && students.removeStudents.length) {
      let removeStudenIds = createRegexQuery(students.removeStudents, 'studentId');
      let res = await update(STUDENTS, {studentId: new RegExp(removeStudenIds)}, {"$set": {[Object.keys(changeData)[0]]: ""}}, {multi: true});
      let res2 = await findStudent({studentId: new RegExp(removeStudenIds)});
      studentResults = [
        ...studentResults,
        ...res2
      ]
    }
    return studentResults;
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.getStudents = async (findData) => {
  try {
    return findStudent(findData);
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.deleteStudent = async ({studentId}) => {
  try {
    let studentRes = await remove(STUDENTS, {studentId});
    return {studentId};
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

const getStudentGraphqlSchema = (student) => ({
  firstName: () => student.firstName,
  lastName: () => student.lastName,
  parentEmail: () => student.parentEmail,
  studentId: () => student.studentId,
  teacherId: () => student.teacherId,
  classId: () => student.classId,
  schoolId: () => student.schoolId,
})

exports.getStudentGraphqlSchema = (student) => getStudentGraphqlSchema(student)

exports.getGraphqlSchema = (students) => {
  return {
    students: () => students.map(student => getStudentGraphqlSchema(student)) || []
  }
}
