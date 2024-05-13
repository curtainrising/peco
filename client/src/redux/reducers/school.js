import { merge } from 'lodash'
import { SCHOOL_ACTIONS, USER_ACTIONS } from '../../helpers/constants';
import { schoolPayloadToSate } from '../../helpers/utils';

const schoolInitialState = {
  school: {},
  schools: [],
  students: {},
  classes: {},
  teachers: {}
}

export default (state = schoolInitialState, action) => {
  const { type, payload } = action;
  let newState = {};
  let keys;
  let values;
  let updatedStudents = {};
  switch (action.type) {
    case USER_ACTIONS.LOGIN_SUCCESS:
    case SCHOOL_ACTIONS.AUTHENTICATE_SUCCESS:
    case SCHOOL_ACTIONS.JOIN_SCHOOL_SUCCESS:
      if (payload.user.schoolId) {
        return schoolPayloadToSate(payload.school);
      }
      return state;
    case SCHOOL_ACTIONS.ADD_CLASS_SUCCESS:
    case SCHOOL_ACTIONS.UPDATE_CLASS_SUCCESS:
      updatedStudents = {};
      payload.students.forEach(item => item.classId !== state.students[item.studentId]? updatedStudents[item.studentId] = item: '');
      newState = {
        ...state,
        students: {...state.students, ...updatedStudents},
        classes: {...state.classes, [payload.class.classId]: payload.class}
      };
      return newState;
    case SCHOOL_ACTIONS.DELETE_CLASS_SUCCESS:
      updatedStudents = {};
      console.log('payload', payload);
      payload.students.forEach(item => updatedStudents[item.studentId] = item);
      newState = {
        ...state,
        students: {...state.students, ...updatedStudents}
      };
      delete newState.classes[payload.class.classId];
      return newState;
    case SCHOOL_ACTIONS.UPLOAD_CLASS_SUCCESS:
      let schoolPayload = schoolPayloadToSate(payload.school);
      console.log('newState', newState);
      newState = {
        ...state,
        students: {...state.students, ...schoolPayload.students},
        classes: {...state.classes, ...schoolPayload.classes},
        teachers: {...state.teachers, ...schoolPayload.teachers},
      };
      console.log('newState', newState);
      return newState;
    case SCHOOL_ACTIONS.ADD_TEACHER_SUCCESS:
    case SCHOOL_ACTIONS.UPDATE_TEACHER_SUCCESS:
      updatedStudents = {};
      console.log('payload', payload);
      payload.students.forEach(item => item.teacherId !== state.students[item.studentId]? updatedStudents[item.studentId] = item: '');
      newState = {
        ...state,
        students: {...state.students, ...updatedStudents},
        teachers: {...state.teachers, [payload.teacher.teacherId]: payload.teacher}
      };
      return newState;
    case SCHOOL_ACTIONS.DELETE_TEACHER_SUCCESS:
      updatedStudents = {};
      console.log('payload', payload);
      payload.students.forEach(item => updatedStudents[item.studentId] = item);
      newState = {
        ...state,
        students: {...state.students, ...updatedStudents}
      };
      delete newState.teachers[payload.teacher.teacherId];
      return newState;
    case SCHOOL_ACTIONS.ADD_STUDENT_SUCCESS:
    case SCHOOL_ACTIONS.UPDATE_STUDENT_SUCCESS:
      newState = {
        ...state
      };
      newState.students[payload.studentId] = payload;
      console.log('newState', newState);
      console.log('newState', newState.students[payload.studentId]);
      return newState;
    case SCHOOL_ACTIONS.DELETE_STUDENT_SUCCESS:
      newState = {
        ...state
      };
      delete newState.students[payload.studentId];
      return newState;
    case SCHOOL_ACTIONS.GET_SCHOOLS_SUCCESS:
      return {...state, schools: payload.schools};
    case USER_ACTIONS.LOG_OUT:
    case SCHOOL_ACTIONS.AUTHENTICATE_FAILURE:
      return schoolInitialState;
    default:
      return state;
  }
};
