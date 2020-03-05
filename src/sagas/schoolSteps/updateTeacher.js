import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { updateTeacherSuccess } from '../../redux/actionCreators';
import { updateTeacher } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* updateTeacherRequest({ payload }) {
  payload.user = JSON.parse(localStorage.getItem('user'));
  console.log('updateTeacherRequest - payload', payload);
  const res = yield call(updateTeacher, payload);
  history.push('/teachers');
  yield put(updateTeacherSuccess(res.data.updateTeacher));
}

export default function* watchUpdateTeacherRequest() {
  yield takeEvery(SCHOOL_ACTIONS.UPDATE_TEACHER_REQUEST, updateTeacherRequest)
}
