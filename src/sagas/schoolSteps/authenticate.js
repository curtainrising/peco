import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { authenticate } from '../../graphql/getSchool';
import { authenticateSuccess } from '../../redux/actionCreators';
import uid from 'uid';

function* authenticateRequest({ payload }) {
  console.log('authenticateRequest', payload);
  const authRes = yield call(authenticate, payload);
  console.log('authRes', authRes);
  yield put(authenticateSuccess(authRes.data.authenticate));
}

export default function* watchAuthenticateRequest() {
  yield takeEvery(SCHOOL_ACTIONS.AUTHENTICATE_REQUEST, authenticateRequest)
}
