import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import uid from 'uid';
import { updateTeacher } from '../../redux/actionCreators';

function* updateTeacherRequest({ payload }) {
  const { teacherId, firstName, lastName, email } = payload;
  console.log('updateTeacherRequest', payload)
  let studentsWitchTeacher = payload.mappedStudentsWithTeacher.map(([studentId]) => studentId)
  let studentsWithoutTeacher = payload.mappedStudentsWithoutTeacher.map(([studentId])  => studentId)
  let changes = {
    teacherId,
    firstName,
    lastName,
    email,
    studentsWitchTeacher,
    studentsWithoutTeacher
  }
  console.log('updatedTeacher',changes)
  yield put(updateTeacher(changes));
}

export default function* watchUpdateTeacherRequest() {
  yield takeEvery('UPDATE_TEACHER_REQUEST', updateTeacherRequest)
}
