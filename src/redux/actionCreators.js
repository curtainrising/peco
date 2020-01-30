import { USER_ACTIONS, SCHOOL_ACTIONS } from '../common/constants';

export const loginRequest = payload => ({
  type: USER_ACTIONS.LOGIN_REQUEST,
  payload
})

export const logout = () => ({
  type: USER_ACTIONS.LOG_OUT
})


export const updateClassRequest = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_CLASS_REQUEST,
  payload
})

export const updateClass = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_CLASS,
  payload
})

export const addClassRequest = payload => ({
  type: SCHOOL_ACTIONS.ADD_CLASS_REQUEST,
  payload
})

export const addClass = payload => ({
  type: SCHOOL_ACTIONS.ADD_CLASS,
  payload
})

export const addStudentRequest = payload => ({
  type: SCHOOL_ACTIONS.ADD_STUDENT_REQUEST,
  payload
})

export const addStudent = payload => ({
  type: SCHOOL_ACTIONS.ADD_STUDENT,
  payload
})

export const updateStudentRequest = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_STUDENT_REQUEST,
  payload
})

export const updateStudent = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_STUDENT,
  payload
})

export const addTeacherRequest = payload => ({
  type: SCHOOL_ACTIONS.ADD_TEACHER_REQUEST,
  payload
})

export const addTeacher = payload => ({
  type: SCHOOL_ACTIONS.ADD_TEACHER,
  payload
})

export const updateTeacherRequest = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_TEACHER_REQUEST,
  payload
})

export const updateTeacher = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_TEACHER,
  payload
})

export const uploadClassRequest = payload => ({
  type: SCHOOL_ACTIONS.UPLOAD_CLASS_REQUEST,
  payload
})

export const uploadClass = payload => ({
  type: SCHOOL_ACTIONS.UPLOAD_CLASS,
  payload
})

export const loginSchool = payload => ({
  type: 'SCHOOL_LOGIN',
  payload
})
