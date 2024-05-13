import 'core-js/stable';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../helpers/constants';
import { formToPayload } from '../../helpers/utils';
import { getSchools } from '../../graphql/getSchool';
import { getSchoolsSuccess } from '../../redux/actionCreators';

function* getSchoolsRequest({payload}) {
  console.log('payload', payload);
  const schoolsResult = yield call(getSchools, payload);
  console.log('schoolsResult', schoolsResult);
  yield put(getSchoolsSuccess(schoolsResult.data.getSchools))
}

export default function* watchSchoolsRequest() {
  yield takeEvery(SCHOOL_ACTIONS.GET_SCHOOLS_REQUEST, getSchoolsRequest)
}
