export const USER_ACTIONS = {
  LOGIN_REQUEST: "LOGIN_REQUEST",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  REGISTER_REQUEST: "REGISTER_REQUEST",
  REGISTER_SUCCESS: "REGISTER_SUCCESS",
  REGISTER_FAILURE: 'REGISTER_FAILURE',
  LOG_OUT: "LOG_OUT",
}
export const SCHOOL_ACTIONS = {
  AUTHENTICATE_REQUEST: 'AUTHENTICATE_REQUEST',
  AUTHENTICATE_SUCCESS: 'AUTHENTICATE_SUCCESS',
  AUTHENTICATE_FAILURE: 'AUTHENTICATE_FAILURE',
  // school actions
  GET_SCHOOLS_REQUEST: 'GET_SCHOOLS_REQUEST',
  GET_SCHOOLS_SUCCESS: 'GET_SCHOOLS_SUCCESS',
  CREATE_SCHOOL_REQUEST: 'CREATE_SCHOOL_REQUEST',
  CREATE_SCHOOL_SUCCESS: 'CREATE_SCHOOL_SUCCESS',
  JOIN_SCHOOL_REQUEST: 'JOIN_SCHOOL_REQUEST',
  JOIN_SCHOOL_SUCCESS: 'JOIN_SCHOOL_SUCCESS',
  JOIN_SCHOOL_FAILURE: 'JOIN_SCHOOL_FAILURE',
  // class actions
  UPDATE_CLASS_REQUEST: 'UPDATE_CLASS_REQUEST',
  UPDATE_CLASS_SUCCESS: 'UPDATE_CLASS_SUCCESS',
  UPDATE_CLASS_FAILURE: 'UPDATE_CLASS_FAILURE',
  ADD_CLASS_REQUEST: 'ADD_CLASS_REQUEST',
  ADD_CLASS_SUCCESS: 'ADD_CLASS_SUCCESS',
  ADD_CLASS_FAILURE: 'ADD_CLASS_FAILURE',
  DELETE_CLASS_REQUEST: 'DELETE_CLASS_REQUEST',
  DELETE_CLASS_SUCCESS: 'DELETE_CLASS_SUCCESS',
  DELETE_CLASS_FAILURE: 'DELETE_CLASS_FAILURE',
  // teacher actions
  ADD_TEACHER_REQUEST: 'ADD_TEACHER_REQUEST',
  ADD_TEACHER_SUCCESS: 'ADD_TEACHER_SUCCESS',
  ADD_TEACHER_FAILURE: 'ADD_TEACHER_FAILURE',
  UPDATE_TEACHER_REQUEST: 'UPDATE_TEACHER_REQUEST',
  UPDATE_TEACHER_SUCCESS: 'UPDATE_TEACHER_SUCCESS',
  UPDATE_TEACHER_FAILURE: 'UPDATE_TEACHER_FAILURE',
  DELETE_TEACHER_REQUEST: 'DELETE_TEACHER_REQUEST',
  DELETE_TEACHER_SUCCESS: 'DELETE_TEACHER_SUCCESS',
  DELETE_TEACHER_FAILURE: 'DELETE_TEACHER_FAILURE',
  // student actions
  ADD_STUDENT_REQUEST: 'ADD_STUDENT_REQUEST',
  ADD_STUDENT_SUCCESS: 'ADD_STUDENT_SUCCESS',
  ADD_STUDENT_FAILURE: 'ADD_STUDENT_FAILURE',
  UPDATE_STUDENT_REQUEST: 'UPDATE_STUDENT_REQUEST',
  UPDATE_STUDENT_SUCCESS: 'UPDATE_STUDENT_SUCCESS',
  UPDATE_SUDENT_FAILURE: 'UPDATE_SUDENT_FAILURE',
  DELETE_STUDENT_REQUEST: 'DELETE_STUDENT_REQUEST',
  DELETE_STUDENT_SUCCESS: 'DELETE_STUDENT_SUCCESS',
  DELETE_STUDENT_FAILURE: 'DELETE_STUDENT_FAILURE',
  // class actions
  UPLOAD_CLASS_REQUEST: 'UPLOAD_CLASS_REQUEST',
  UPLOAD_CLASS_SUCCESS: 'UPLOAD_CLASS_SUCCESS',
  UPLOAD_CLASS_FAILURE: 'UPLOAD_CLASS_FAILURE',
}

export const UI_ACTIONS = {
  REMOVE_ERROR: 'REMOVE_ERROR',
  ADD_ERROR: 'ADD_ERROR',
  UPDATE_ERROR: 'UPDATE_ERROR',
}

export const LANGUAGES = {
  ENGLISH: "en",
}

export const ID_TYPE = {
  CLASS_ID: 'classId',
  TEACHER_ID: 'teacherId',
  SCHOOL_ID: 'schoolId',
}

export const ERRORS = {
  UNKOWN_ERROR: {
    code: "UNKOWN_ERROR",
    message: 'Unkown error, please contact support'
  },
  UNAUHORIZED: {
    code: "UNAUHORIZED",
    message: 'Unauthorized to take this action'
  },
  BAD_PASSWORD: {
    code: "BAD_PASSWORD",
    message: 'Password does not match'
  },
  NO_USER: {
    code: "NO_USER",
    message: 'No user found'
  },
  USER_EXISTS: {
    code: "USER_EXISTS",
    message: 'User already exists'
  },
  PASSWORD_NO_MATCH: {
    code: 'PASSWORD_NO_MATCH',
    message: 'Passwords do not match'
  },
  PASSWORD_CHECK_NO_MATCH: {
    code: 'PASSWORD_CHECK_NO_MATCH',
    message: 'Does not match password'
  },
  NO_VALUE: {
    code: 'NO_VALUE',
    message: 'No value entered, required'
  }
}