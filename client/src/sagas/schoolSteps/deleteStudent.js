import 'core-js/stable';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { deleteStudentSuccess, deleteStudentFailure } from '../../redux/actionCreators';
import { deleteStudent } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* deleteStudentRequest({ payload }) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log('deleteStudentRequest - payload', payload);
  console.log('student', payload);
  const res = yield call(deleteStudent, {user, student: payload});
  console.log('res',res);
  if (!res || !res.data) {
    yield put(deleteStudentFailure(res.extensions.code));
    return;
  }
  history.push('/students');
  yield put(deleteStudentSuccess(res.data.deleteStudent));
}

export default function* watchDeleteStudentRequest() {
  yield takeEvery(SCHOOL_ACTIONS.DELETE_STUDENT_REQUEST, deleteStudentRequest)
}
