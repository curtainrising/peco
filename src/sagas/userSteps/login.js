import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { loadAll } from '../../api';
import { loginSchool } from '../../redux/actionCreators';

function* loginRequest(payload) {
  // let response = yield loadAll();
  // console.log('response',response);
  // yield put(loginSchool(response.data.school));
  localStorage.setItem('user', JSON.stringify({isAtuhenticated: true}))
  yield put({type: 'LOGIN', payload});
}

export default function* watchLoginRequest() {
  yield takeEvery('LOGIN_REQUEST', loginRequest)
}
