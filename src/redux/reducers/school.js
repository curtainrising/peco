import { SCHOOL_ACTIONS as actions } from '../../common/constants';
import { merge } from 'lodash'

const defaultStudent = {
  firstName: '',
  lastName: '',
  teacher: ''
}
const schoolInitialStateDemo = {
  students: {
    1111111111: {
      firstName: 'sam',
      lastName: 'medalen',
      parentEmail: "paret@email.com",
      teacherId: '1234567890',
      classId: '0987654321'
    },
    2222222222: {
      firstName: 'frances',
      lastName: 'medalen',
      parentEmail: "paret@email.com",
      teacherId: '1234567890',
      classId: "0987654321"
    },
    3333333333: {
      firstName: 'Luke',
      lastName: 'Smith',
      parentEmail: "rid@mire.com",
      teacherId: '',
      classId: "0987654322"
    },
    4444444444: {
      firstName: 'dude',
      lastName: 'farts',
      parentEmail: "rid@mire.com",
      teacherId: '',
      classId: ""
    },
    5555555555: {
      firstName: 'dudes',
      lastName: 'fartss',
      parentEmail: "rid@mire.com",
      teacherId: '',
      classId: ""
    },
    6666666666: {
      firstName: 'stupid',
      lastName: 'fartss',
      parentEmail: "rid@mire.com",
      teacherId: '',
      classId: ""
    },
    7777777777: {
      firstName: 'donot',
      lastName: 'fartss',
      parentEmail: "rid@mire.com",
      teacherId: '',
      classId: ""
    }
  },
  classes: {
    "0987654321": {
      teacherId: '1234567890',
      className: 'Sally first',
      students: [
        '1111111111',
        '2222222222'
      ]
    },
    "0987654322": {
      teacherId: '1234567890',
      className: 'Sally second',
      students: [
        '3333333333'
      ]
    }
  },
  teachers: {
    1234567890: {
      firstName: 'Sally',
      lastName: 'Mayhem',
      email: "teacher@teacher.com"
    }
  }
}
const schoolInitialState = {
  students: {},
  classes: {},
  teachers: {}
}

export default (state = schoolInitialStateDemo, action) => {
  const { type, payload } = action;
  let newState;
  let keys;
  let values;
  switch (action.type) {
    case 'SCHOOL_LOGIN':
      newState = merge({}, payload);
      console.log('newState',newState);
      return newState;
    case actions.ADD_STUDENT:
      console.log(action.payload);
      newState = merge({}, state)
      keys = Object.keys(action.payload);
      values = Object.values(action.payload);
      values.map((student, index) => {
        newState.students[keys[index]] = student;
        if (student.classId) {
          newState.classes[student.classId].students.push(keys[index])
        }
      })
      console.log('newState',newState)
      return newState;
    case actions.UPDATE_STUDENT:
      console.log('UPDATE_STUDENT', action.payload);
      newState = merge({}, state)
      keys = Object.keys(action.payload);
      values = Object.values(action.payload);
      values.map((student, index) => {
        let oldClassId = newState.students[keys[index]].classId == "0"? null: newState.students[keys[index]].classId
        let newClassId = student.classId == "0"? null: student.classId
        if (oldClassId) {
          let indexOf = newState.classes[oldClassId].students.indexOf(keys[index]);
          newState.classes[oldClassId].students.splice(indexOf,1);
        }
        newState.students[keys[index]] = student;
        if (newClassId) {
          newState.classes[newClassId].students.push(keys[index])
        }
      })
      console.log('newState',newState)
      return newState;
    case actions.ADD_TEACHER:
      console.log('ADD_TEACHER', action.payload);
      newState = merge({}, state)
      let teacherKeys = Object.keys(action.payload);
      let teacherValues = Object.values(action.payload);
      teacherValues.map((teacher, index) => {
        console.log('teacher', teacher);
        newState.teachers[teacherKeys[index]] = {};
        newState.teachers[teacherKeys[index]].firstName = teacher.firstName;
        newState.teachers[teacherKeys[index]].lastName = teacher.lastName;
        newState.teachers[teacherKeys[index]].email = teacher.email;
      })
      teacherKeys.map((teacherId, index) => {
        teacherValues[0].mappedStudentsWithTeacher.forEach(([studentId]) => {
          newState.students[studentId].teacherId = teacherKeys[0];
        })
        teacherValues[0].mappedStudentsWithoutTeacher.forEach(([studentId]) => {
          newState.students[studentId].teacherId = '';
        })
      })
      console.log('newState',newState)
      return newState;
    case actions.UPDATE_CLASS:
      console.log('payload',action.payload);
      newState = merge({}, state)
      newState.classes[payload.classId].students = payload.studentsInClass;
      newState.classes[payload.classId].className = payload.className;
      payload.studentsInClass.forEach(studentId => {
        newState.students[studentId].classId = payload.classId;
      })
      payload.studentsOutOfClass.forEach(studentId => {
        newState.students[studentId].className = '';
      })
      console.log('newState',newState);
      return newState;
    case actions.UPDATE_TEACHER:
      console.log('UPDATE_TEACHER', action.payload);
      newState = merge({}, state)
      newState.teachers[payload.teacherId].firstName = payload.firstName;
      newState.teachers[payload.teacherId].lastName = payload.lastName;
      newState.teachers[payload.teacherId].email = payload.email;

      payload.studentsWitchTeacher.forEach((studentId) => {
        newState.students[studentId].teacherId = payload.teacherId;
      })
      payload.studentsWithoutTeacher.forEach((studentId) => {
        newState.students[studentId].teacherId = '';
      })
      console.log('newState', newState);
      return newState;
    case actions.ADD_CLASS:
      console.log('ADD_CLASS', action.payload);
      newState = merge({}, state)
      newState.classes[payload.classId] = {};
      newState.classes[payload.classId].className = payload.className;
      newState.classes[payload.classId].students = payload.studentsInClass;
      payload.studentsInClass.forEach(studentId => {
        newState.students[studentId].classId = payload.classId;
      })
      payload.studentsOutOfClass.forEach(studentId => {
        newState.students[studentId].className = '';
      })
      console.log('newState', newState);
      return newState;
    case actions.UPLOAD_CLASS:
      console.log('payload',action.payload);
      newState = merge({}, state)
      keys = Object.keys(action.payload);
      values = Object.values(action.payload);
      let newClassId = keys[0];
      newState.classes[newClassId] = {
        className: values[0].className,
        students: []
      }
      values[0].students.forEach(student => {
        if (newState.students[student.key]) {
          newState.students[student.key].teacherId = student.teacherId
          let oldClassId = newState.students[student.key].classId == "0"? null: newState.students[student.key].classId
          if (oldClassId) {
            let indexOf = newState.classes[oldClassId].students.indexOf(student.key);
            newState.classes[oldClassId].students.splice(indexOf,1);
            newState.students[student.key].classId = '';
          }
        } else {
          newState.students[student.key] = {
            firstName: student.firstName,
            lastName: student.lastName,
            parentEmail: student.parentEmail,
            classId: newClassId,
            teacherId: student.teacherId
          }
        }
        if (!newState.teachers[student.teacherId]) {
          console.log('teacherEmail',student.teacherEmail);
          newState.teachers[student.teacherId] = {
            firstName: 'new',
            lastName: 'teacher',
            email: student.teacherEmail
          }
        }
        newState.students[student.key].classId = newClassId;
        newState.classes[newClassId].students.push(student.key)
      })
      console.log('newState',newState);
      return newState;
    default:
      return state;
  }
};
