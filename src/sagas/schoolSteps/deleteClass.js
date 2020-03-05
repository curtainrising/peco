import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { deleteClassSuccess } from '../../redux/actionCreators';
import { deleteClass } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* deleteClassRequest({ payload }) {
  payload.user = JSON.parse(localStorage.getItem('user'));
  console.log('deleteTeacherRequest - payload', payload);
  const res = yield call(deleteClass, payload);
  console.log('res',res);
  history.push('/classes');
  yield put(deleteClassSuccess(res.data.deleteClass));
}

export default function* watchDeleteClassRequest() {
  yield takeEvery(SCHOOL_ACTIONS.DELETE_CLASS_REQUEST, deleteClassRequest)
}
