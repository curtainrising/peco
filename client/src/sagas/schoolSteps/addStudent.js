import 'core-js/stable';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { formToPayload } from '../../helpers/utils';
import { createStudentSuccess, createStudentFail } from '../../redux/actionCreators';
import { addStudent } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* addStudentRequest({ payload }) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('payload', payload);
  let student = formToPayload(payload);
  console.log('student',student)
  const studentRes = yield call(addStudent, {user, student});
  console.log('studentRes', studentRes);
  if (!studentRes || !studentRes.data) {
    yield put(createStudentFail(studentRes.extensions.code));
    return;
  }
  history.push('/students');
  yield put(createStudentSuccess(studentRes.data.addStudent))
}

export default function* watchAddStudentRequest() {
  yield takeEvery(SCHOOL_ACTIONS.ADD_STUDENT_REQUEST, addStudentRequest)
}
