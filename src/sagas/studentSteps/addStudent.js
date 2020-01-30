import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import uid from 'uid';

function* addStudentRequest({ payload }) {
  let studentId = uid(10);
  console.log('studentId',studentId);
  console.log(payload);
  let newStudent = {
    [studentId]: payload
  }
  yield put({type: 'ADD_STUDENT', payload: newStudent});
}

export default function* watchAddStudentRequest() {
  yield takeEvery('ADD_STUDENT_REQUEST', addStudentRequest)
}
