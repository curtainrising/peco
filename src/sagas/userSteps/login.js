import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { USER_ACTIONS } from '../../helpers/constants';
import { formToPayload } from '../../helpers/utils';
import { loadAll } from '../../api';
import { loginSuccess } from '../../redux/actionCreators';
import { login } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* loginRequest({payload}) {
  console.log('payload', payload);
  let loginData = formToPayload(payload);
  console.log('loginData', loginData)
  const loginResult = yield call(login, loginData);
  console.log('loginResult', loginResult);
  history.push('/');
  yield put(loginSuccess(loginResult.data.login))
}

export default function* watchLoginRequest() {
  yield takeEvery(USER_ACTIONS.LOGIN_REQUEST, loginRequest)
}
