import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import uid from 'uid';

function* addTeacherRequest({ payload }) {
  let teacherId = uid(10);
  console.log('addTeacherRequest- teacherId',teacherId);
  console.log(payload);
  let newTeacher = {
    [teacherId]: payload
  }
  console.log('addTeacherRequest - payload', payload);
  yield put({type: 'ADD_TEACHER', payload: newTeacher});
}

export default function* watchAddTeacherRequest() {
  yield takeEvery('ADD_TEACHER_REQUEST', addTeacherRequest)
}
