const uuid = require('uuid');
const { GraphQLError } = require('graphql');
const { find, add, remove, update } = require('../../helpers/mongoHelper');
const teacherControl = require('./teachers');
const classeControl = require('./classes');
const studentControl = require('./students');
const { getSchoolSchema } = require('../../helpers/schemas');
const { filterData } = require('../../helpers/utils');
const { COLLECTION: { SCHOOL }, ERRORS, APP_SECRET} = require('../../helpers/constants');
const logger = require('../../helpers/logger').init('School Control');

const findSchool = async (data) => {
  try {
    return find(SCHOOL, data);
  } catch (e) {
    throw e;
  }
}

exports.createSchool = async ({schoolName, password}) => {
  try {
    const schoolRes = await findSchool({schoolName});
    if (schoolRes.length >= 1) {
      throw new Error('School already exists');
    }
    const schoolId = uuid();
    school = await add(SCHOOL, {...getSchoolSchema(), schoolName, schoolId, password, "_id": schoolId})

    return {
      school,
      teachers: [],
      students: [],
      classes: [],
    }
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }

}

const getSchoolData = async (schoolData) => {
  try {
    const schoolId = schoolData.schoolId;
    const students = await studentControl.getStudents({schoolId});
    const classes = await classeControl.getClasses({schoolId});
    const teachers = await teacherControl.getTeachers({schoolId});
    return {
      school: schoolData,
      classes,
      teachers,
      students
    }
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.joinSchool = async (schoolData) => {
  try {
    const schoolRes = await findSchool({schoolName: schoolData.schoolName});
    if (schoolRes.length !== 1) {
      throw new GraphQLError(
        ERRORS.NO_SCHOOL,
        {
          extensions: {
            code: ERRORS.NO_SCHOOL,
          }
        }
      );
    } else if (schoolRes[0].password !== schoolData.password) {
      throw new GraphQLError(
        ERRORS.BAD_PASSWORD,
        {
          extensions: {
            code: ERRORS.BAD_PASSWORD,
          }
        }
      );
    }
    return getSchoolData(schoolRes[0])
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.getSchool = async (schoolData) => {
  try {
    const schoolRes = await findSchool(schoolData);
    if (schoolRes.length !== 1) {
      throw new Error('School does not exist');
    }
    return getSchoolData(schoolRes[0])
  } catch (e) {
    logger.logError(e.message);
    throw e;
  }
}

exports.getSchools = async () => {
  return findSchool({});
}

const getSingleSchoolSchema = ({schoolName, schoolId}) => {
  return {schoolName, schoolId};
}
exports.getGraphqlSchema = ({school, classes, teachers, students}) => {
  let temp = {
    school: () => ({
      school: () => getSingleSchoolSchema(school),
      ...studentControl.getGraphqlSchema(students),
      ...teacherControl.getGraphqlSchema(teachers),
      ...classeControl.getGraphqlSchema(classes),
    })
  }
  return temp;
}

exports.getSchoolsGraphqlSchema = (schools) => ({
  schools: () => schools.map(item => getSingleSchoolSchema(item))
})
