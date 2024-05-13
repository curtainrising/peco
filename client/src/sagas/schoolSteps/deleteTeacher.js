import 'core-js/stable';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { deleteTeacherSuccess, deleteTeacherFailure } from '../../redux/actionCreators';
import { deleteTeacher } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* deleteTeacherRequest({ payload }) {
  payload.user = JSON.parse(localStorage.getItem('user'));
  console.log('deleteTeacherRequest - payload', payload);
  const res = yield call(deleteTeacher, payload);
  console.log('res',res);
  if (!res || !res.data) {
    yield put(deleteTeacherFailure(res.extensions.code));
    return;
  }
  history.push('/teachers');
  yield put(deleteTeacherSuccess(res.data.deleteTeacher));
}

export default function* watchDeleteTeacherRequest() {
  yield takeEvery(SCHOOL_ACTIONS.DELETE_TEACHER_REQUEST, deleteTeacherRequest)
}
