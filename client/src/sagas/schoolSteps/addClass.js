import 'core-js/stable';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { createClassSuccess, createClassFailure } from '../../redux/actionCreators';
import { addClass } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* addClassRequest({ payload }) {
  payload.user = JSON.parse(localStorage.getItem('user'));
  const res = yield call(addClass, payload);
  if (!res || !res.data) {
    yield put(createClassFailure(res.extensions.code));
    return;
  }
  history.push('/classes');
  yield put(createClassSuccess(res.data.addClass));
}

export default function* watchAddClassRequest() {
  yield takeEvery(SCHOOL_ACTIONS.ADD_CLASS_REQUEST, addClassRequest)
}
