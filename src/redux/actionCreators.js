import { USER_ACTIONS, SCHOOL_ACTIONS } from '../helpers/constants';

// USER ACTIONS
export const loginRequest = payload => ({
  type: USER_ACTIONS.LOGIN_REQUEST,
  payload
})

export const loginSuccess = payload => ({
  type: USER_ACTIONS.LOGIN_SUCCESS,
  payload
})

export const registerRequest = payload => ({
  type: USER_ACTIONS.REGISTER_REQUEST,
  payload
})

export const registerSuccess = payload => ({
  type: USER_ACTIONS.REGISTER_SUCCESS,
  payload
})

export const logout = () => ({
  type: USER_ACTIONS.LOG_OUT
})

// SCHOOL ACTIONS
// School
export const getSchoolsRequest = payload => ({
  type: SCHOOL_ACTIONS.GET_SCHOOLS_REQUEST,
  payload
})

export const getSchoolsSuccess = payload => ({
  type: SCHOOL_ACTIONS.GET_SCHOOLS_SUCCESS,
  payload
})

export const createSchoolRequest = payload => ({
  type: SCHOOL_ACTIONS.CREATE_SCHOOL_REQUEST,
  payload
})

export const createSchoolSuccess = payload => ({
  type: SCHOOL_ACTIONS.CREATE_SCHOOL_SUCCESS,
  payload
})

export const joinSchoolRequest = payload => ({
  type: SCHOOL_ACTIONS.JOIN_SCHOOL_REQUEST,
  payload
})

export const joinSchoolSuccess = payload => ({
  type: SCHOOL_ACTIONS.JOIN_SCHOOL_SUCCESS,
  payload
})

// authenticate
export const authenticateRequest = payload => ({
  type: SCHOOL_ACTIONS.AUTHENTICATE_REQUEST,
  payload
})

export const authenticateSuccess = payload => ({
  type: SCHOOL_ACTIONS.AUTHENTICATE_SUCCESS,
  payload
})

// classes
export const createClassRequest = payload => ({
  type: SCHOOL_ACTIONS.ADD_CLASS_REQUEST,
  payload
})

export const createClassSuccess = payload => ({
  type: SCHOOL_ACTIONS.ADD_CLASS_SUCCESS,
  payload
})

export const updateClassRequest = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_CLASS_REQUEST,
  payload
})

export const updateClassSuccess = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_CLASS_SUCCESS,
  payload
})

export const deleteClassRequest = payload => ({
  type: SCHOOL_ACTIONS.DELETE_CLASS_REQUEST,
  payload
})

export const deleteClassSuccess = payload => ({
  type: SCHOOL_ACTIONS.DELETE_CLASS_SUCCESS,
  payload
})

export const uploadClassRequest = payload => ({
  type: SCHOOL_ACTIONS.UPLOAD_CLASS_REQUEST,
  payload
})

export const uploadClassSuccess = payload => ({
  type: SCHOOL_ACTIONS.UPLOAD_CLASS_SUCCESS,
  payload
})

export const createTeacherRequest = payload => ({
  type: SCHOOL_ACTIONS.ADD_TEACHER_REQUEST,
  payload
})

export const createTeacherSuccess = payload => ({
  type: SCHOOL_ACTIONS.ADD_TEACHER_SUCCESS,
  payload
})

export const updateTeacherRequest = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_TEACHER_REQUEST,
  payload
})

export const updateTeacherSuccess = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_TEACHER_SUCCESS,
  payload
})

export const deleteTeacherRequest = payload => ({
  type: SCHOOL_ACTIONS.DELETE_TEACHER_REQUEST,
  payload
})

export const deleteTeacherSuccess = payload => ({
  type: SCHOOL_ACTIONS.DELETE_TEACHER_SUCCESS,
  payload
})

export const createStudentRequest = payload => ({
  type: SCHOOL_ACTIONS.ADD_STUDENT_REQUEST,
  payload
})

export const createStudentSuccess = payload => ({
  type: SCHOOL_ACTIONS.ADD_STUDENT_SUCCESS,
  payload
})

export const updateStudentRequest = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_STUDENT_REQUEST,
  payload
})

export const udpateStudentSuccess = payload => ({
  type: SCHOOL_ACTIONS.UPDATE_STUDENT_SUCCESS,
  payload
})

export const deleteStudentRequest = payload => ({
  type: SCHOOL_ACTIONS.DELETE_STUDENT_REQUEST,
  payload
})

export const deleteStudentSuccess = payload => ({
  type: SCHOOL_ACTIONS.DELETE_STUDENT_SUCCESS,
  payload
})
