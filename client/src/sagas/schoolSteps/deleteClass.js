import 'core-js/stable';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { deleteClassSuccess, deleteClassFailure } from '../../redux/actionCreators';
import { deleteClass } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* deleteClassRequest({ payload }) {
  payload.user = JSON.parse(localStorage.getItem('user'));
  console.log('deleteTeacherRequest - payload', payload);
  const res = yield call(deleteClass, payload);
  console.log('res',res);
  if (!res || !res.data) {
    yield put(deleteClassFailure(res.extensions.code));
    return;
  }
  history.push('/classes');
  yield put(deleteClassSuccess(res.data.deleteClass));
}

export default function* watchDeleteClassRequest() {
  yield takeEvery(SCHOOL_ACTIONS.DELETE_CLASS_REQUEST, deleteClassRequest)
}
