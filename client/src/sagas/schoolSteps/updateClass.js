import 'core-js/stable';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { updateClassSuccess, updateClassFailure } from '../../redux/actionCreators';
import { updateClass } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* updateClassRequest({ payload }) {
  payload.user = JSON.parse(localStorage.getItem('user'));
  const res = yield call(updateClass, payload);
  console.log('res',res);
  if (!res || !res.data) {
    yield put(updateClassFailure(res.extensions.code));
    return;
  }
  history.push('/classes');
  yield put(updateClassSuccess(res.data.updateClass));
}

export default function* watchUpdateClassRequest() {
  yield takeEvery(SCHOOL_ACTIONS.UPDATE_CLASS_REQUEST, updateClassRequest)
}
