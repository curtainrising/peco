import 'core-js/stable';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { formToPayload } from '../../helpers/utils';
import { getSchools } from '../../graphql/getSchool';
import { createSchoolSuccess } from '../../redux/actionCreators';

function* createSchoolRequest({payload}) {
  console.log('payload', payload);
  // const schoolsResult = yield call(getSchools, payload);
  // console.log('schoolsResult', schoolsResult);
  // yield put(createSchoolSuccess(schoolsResult.data.getSchools))
}

export default function* watchCreateSchoolRequest() {
  yield takeEvery(SCHOOL_ACTIONS.CREATE_SCHOOL_REQUEST, createSchoolRequest)
}
