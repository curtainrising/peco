import 'babel-polyfill';
import { all } from 'redux-saga/effects';
import loginRequest from './userSteps/login';
import addStudent from './studentSteps/addStudent';
import updateStudent from './studentSteps/updateStudent';
import addTeacher from './studentSteps/addTeacher';
import updateTeacher from './studentSteps/updateTeacher';
import updateClass from './studentSteps/updateClass';
import addClass from './studentSteps/addClass';
import uploadClass from './studentSteps/uploadClass';

export default function* rootSaga() {
  yield all([
    loginRequest(),
    addStudent(),
    updateStudent(),
    addTeacher(),
    updateTeacher(),
    updateClass(),
    addClass(),
    uploadClass()
  ])
}
