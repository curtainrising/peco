import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { createTeacherSuccess } from '../../redux/actionCreators';
import { addTeacher } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* addTeacherRequest({ payload }) {
  payload.user = JSON.parse(localStorage.getItem('user'));
  console.log('addTeacherRequest - payload', payload);
  const res = yield call(addTeacher, payload);
  console.log('res',res);
  history.push('/teachers');
  yield put(createTeacherSuccess(res.data.addTeacher));
}

export default function* watchAddTeacherRequest() {
  yield takeEvery(SCHOOL_ACTIONS.ADD_TEACHER_REQUEST, addTeacherRequest)
}
