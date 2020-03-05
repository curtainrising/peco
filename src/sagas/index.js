import 'babel-polyfill';
import { all } from 'redux-saga/effects';
import loginRequest from './userSteps/login';
import registerRequest from './userSteps/register';
import authenticateRequest from './schoolSteps/authenticate';
import getSchoolsRequest from './schoolSteps/getSchools';
import joinSchoolRequest from './schoolSteps/joinSchool';
import createSchoolRequest from './schoolSteps/createSchool';
import addClassRequest from './schoolSteps/addClass';
import updateClassRequest from './schoolSteps/updateClass';
import deleteClassRequest from './schoolSteps/deleteClass';
import uploadClassRequest from './schoolSteps/uploadClass';
import addTeacherRequest from './schoolSteps/addTeacher';
import updateTeacherRequest from './schoolSteps/updateTeacher';
import deleteTeacherRequest from './schoolSteps/deleteTeacher';
import addStudentRequest from './schoolSteps/addStudent';
import updateStudentRequest from './schoolSteps/updateStudent';
import deleteStudentRequest from './schoolSteps/deleteStudent';

export default function* rootSaga() {
  yield all([
    loginRequest(),
    registerRequest(),
    authenticateRequest(),
    getSchoolsRequest(),
    joinSchoolRequest(),
    createSchoolRequest(),
    addClassRequest(),
    updateClassRequest(),
    deleteClassRequest(),
    uploadClassRequest(),
    addTeacherRequest(),
    deleteTeacherRequest(),
    updateTeacherRequest(),
    addStudentRequest(),
    updateStudentRequest(),
    deleteStudentRequest(),
  ])
}
