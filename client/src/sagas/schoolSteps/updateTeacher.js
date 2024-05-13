import 'core-js/stable';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { updateTeacherSuccess, updateTeacherFailure } from '../../redux/actionCreators';
import { updateTeacher } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* updateTeacherRequest({ payload }) {
  payload.user = JSON.parse(localStorage.getItem('user'));
  console.log('updateTeacherRequest - payload', payload);
  const res = yield call(updateTeacher, payload);
  if (!res || !res.data) {
    yield put(updateTeacherFailure(res.extensions.code));
    return;
  }
  history.push('/teachers');
  yield put(updateTeacherSuccess(res.data.updateTeacher));
}

export default function* watchUpdateTeacherRequest() {
  yield takeEvery(SCHOOL_ACTIONS.UPDATE_TEACHER_REQUEST, updateTeacherRequest)
}
