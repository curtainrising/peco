import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import { SCHOOL_ACTIONS } from '../../common/constants';
import { addClass } from '../../redux/actionCreators';
import uid from 'uid';

function* addClassRequest({ payload }) {
  let classId = uid(10);
  const { className, mappedStudentsInClass, mappedStudentsNotInClass } = payload;
  let studentsOutOfClass = mappedStudentsNotInClass.map((student) => student.key)
  let studentsInClass = mappedStudentsInClass.map((student) => student.key)
  let changes = {
    classId,
    className,
    studentsOutOfClass,
    studentsInClass
  }
  yield put(addClass(changes))
}

export default function* watchAddClassRequest() {
  yield takeEvery(SCHOOL_ACTIONS.ADD_CLASS_REQUEST, addClassRequest)
}
