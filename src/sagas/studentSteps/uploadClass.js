import 'babel-polyfill';
import { takeEvery, call, put } from 'redux-saga/effects'
import uid from 'uid';

function* uploadClassRequest({ payload : { students, className } }) {
  let classId = uid(10);
  console.log('classId',classId);
  console.log(className, students);
  let currentTeachersByEmail = {};
  let currentTeachers = [];
  students.forEach(student => {
    if (!student.key) {
      student.key = uid(10);
    }
    if (student.teacherId && !currentTeachersByEmail[student.teacherEmail]) {
      currentTeachersByEmail[student.teacherEmail] = student.teacherId;
      currentTeachers.push(student.teacherId);
    }
    if (!currentTeachersByEmail[student.teacherEmail]) {
      currentTeachersByEmail[student.teacherEmail] = uid(10);
      currentTeachers.push(currentTeachersByEmail[student.teacherEmail]);
    }
    if (!student.teacherId) {
      student.teacherId = currentTeachersByEmail[student.teacherEmail];
    }
  })
  // send new students
  // send new teachers
  // update old teachers
  // send New class
  // update old classes
  let newClass = {
    [classId]: {
      className,
      students,
      teachers: currentTeachers
    }
  }
  yield put({type: 'UPLOAD_CLASS', payload: newClass});
}

export default function* watchUploadClassRequest() {
  yield takeEvery('UPLOAD_CLASS_REQUEST', uploadClassRequest)
}
