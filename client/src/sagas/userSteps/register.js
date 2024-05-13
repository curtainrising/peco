import 'core-js/stable';
import { takeEvery, call, put } from 'redux-saga/effects'
import { USER_ACTIONS } from '../../helpers/constants';
import { formToPayload } from '../../helpers/utils';
import { register } from '../../graphql/getSchool';
import { registerSuccess, registerFailure } from '../../redux/actionCreators';
import history from '../../helpers/history';

function* registerRequest({payload}) {
  console.log('payload', payload);
  let registerData = formToPayload(payload);
  console.log('registerData',registerData)
  const registerResult = yield call(register, registerData);
  console.log('registerResult', registerResult);
  if (!registerResult || !registerResult.data) {
    yield put(registerFailure(registerResult.extensions.code));
    return;
  }
  yield put(registerSuccess({user: registerResult.data.register}))
}

export default function* watchLoginRequest() {
  yield takeEvery(USER_ACTIONS.REGISTER_REQUEST, registerRequest)
}
