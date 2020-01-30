import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import uid from 'uid';

function* updateStudentRequest({ payload }) {
  console.log('UPDATE_STUDENT_REQUEST');
  let { studentId } = payload
  console.log('studentId',studentId);
  console.log(payload);
  let updateStudent = {
    [studentId]: payload
  }
  yield put({type: 'UPDATE_STUDENT', payload: updateStudent});
}

export default function* watchUpdateStudentRequest() {
  yield takeEvery('UPDATE_STUDENT_REQUEST', updateStudentRequest)
}
