const uuid = require('uuid');
const { find, add, remove, update, updateAndReturn, addMany } = require('../../helpers/mongoHelper');
const { getStudentSchema } = require('../../helpers/schemas');
const { filterData, createRegexQuery } = require('../../helpers/utils');
const { COLLECTION: { STUDENTS }} = require('../../helpers/constants');
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
    student['studentId'] = uuid();
    student['_id'] = student['studentId'];
    student['schoolId'] = schoolId;
    let addStudentRes = await add(STUDENTS, {...getStudentSchema(), ...student});
    return addStudentRes;
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
        students[i].studentId = uuid();
        addStudents.push(students[i]);
      }
    }
    if (addStudents.length) {
      let addStudentRes = await addMany(STUDENTS, addStudents);
      console.log('addStudentRes', addStudentRes);
    }
    if (updatedStudents.length) {
      let promises = [];
      for (let i = 0; i < updatedStudents.length; i++) {
        promises.push(update(STUDENTS, {studentId: updatedStudents[i].studentId}, {"$set": updatedStudents[i]}));
      }
      let updatedStudentRes = await Promise.all(promises);
      console.log('updatedStudentRes', updatedStudentRes);
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
  console.log('students', students)
  try {
    let studentResults = [];
    if (students.addStudents && students.addStudents.length) {
      let addStudentIds = createRegexQuery(students.addStudents, 'studentId');
      console.log('addStudentIds',addStudentIds);
      let res = await update(STUDENTS, {studentId: new RegExp(addStudentIds)}, {"$set": changeData}, {multi: true});
      let res2 = await findStudent({"studentId": new RegExp(addStudentIds)});
      console.log('addStudents - res',res2);
      studentResults = [
        ...res2
      ]
    }
    if (students.removeStudents && students.removeStudents.length) {
      let removeStudenIds = createRegexQuery(students.removeStudents, 'studentId');
      console.log('removeStudenIds',removeStudenIds);
      let res = await update(STUDENTS, {studentId: new RegExp(removeStudenIds)}, {"$set": {[Object.keys(changeData)[0]]: ""}}, {multi: true});
      console.log('res', res);
      let res2 = await findStudent({studentId: new RegExp(removeStudenIds)});
      console.log('removeStudents - res',res2);
      studentResults = [
        ...studentResults,
        ...res2
      ]
    }
    console.log('studentResults', studentResults);
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
