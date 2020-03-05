import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { uploadClassSuccess } from '../../redux/actionCreators';
import { uploadClass } from '../../graphql/getSchool';
import history from '../../helpers/history';

function* uploadClassRequest({ payload }) {
  console.log('payload', payload);
  const user = JSON.parse(localStorage.getItem('user'));
  const res = yield call(uploadClass, {user, uploadData: payload});
  // history.push('/classes');
  yield put(uploadClassSuccess(res.data.uploadClass));
}

export default function* watchUploadClassRequest() {
  yield takeEvery(SCHOOL_ACTIONS.UPLOAD_CLASS_REQUEST, uploadClassRequest)
}
