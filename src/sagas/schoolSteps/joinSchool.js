import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { formToPayload } from '../../helpers/utils';
import { joinSchool } from '../../graphql/getSchool';
import { joinSchoolSuccess } from '../../redux/actionCreators';

function* joinSchoolRequest({payload}) {
  console.log('joinSchoolRequest - payload', payload);
  let joinData = formToPayload(payload.data);
  console.log('joinData', {user: payload.user, school: joinData});
  const schoolsResult = yield call(joinSchool, {user: payload.user, school: joinData});
  console.log('schoolsResult', schoolsResult);
  yield put(joinSchoolSuccess(schoolsResult.data.joinSchool))
}

export default function* watchJoinSchoolRequest() {
  yield takeEvery(SCHOOL_ACTIONS.JOIN_SCHOOL_REQUEST, joinSchoolRequest)
}
