import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { formToPayload } from '../../helpers/utils';
import { udpateStudentSuccess } from '../../redux/actionCreators';
import { updateStudent } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* updateStudentRequest({ payload }) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('payload', payload);
  let student = {
    ...payload.studentData,
    ...formToPayload(payload.changeData)
  };
  console.log('student',student)
  const studentRes = yield call(updateStudent, {user, student});
  console.log('studentRes', studentRes);
  history.push('/students');
  yield put(udpateStudentSuccess(studentRes.data.updateStudent))
}

export default function* watchUpdateStudentRequest() {
  yield takeEvery(SCHOOL_ACTIONS.UPDATE_STUDENT_REQUEST, updateStudentRequest)
}
