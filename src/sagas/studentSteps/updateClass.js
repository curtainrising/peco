import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../common/constants';
import { updateClass } from '../../redux/actionCreators';
import uid from 'uid';

function* updateClassRequest({ payload }) {
  const { className, classId, mappedStudentsInClass, mappedStudentsNotInClass } = payload;
  let studentsOutOfClass = mappedStudentsNotInClass.map((student) => student.key)
  let studentsInClass = mappedStudentsInClass.map((student) => student.key)
  let changes = {
    classId,
    className,
    studentsOutOfClass,
    studentsInClass
  }
  yield put(updateClass(changes))
}

export default function* watchUpdateClassRequest() {
  yield takeEvery(SCHOOL_ACTIONS.UPDATE_CLASS_REQUEST, updateClassRequest)
}
