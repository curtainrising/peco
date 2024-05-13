module.exports = {
  APP_SECRET: '1234',
  DBNAME: 'peco',
  COLLECTION: {
    USERS: 'users',
    SCHOOL: 'schools',
    CLASSES: 'classes',
    STUDENTS: 'students',
    TEACHERS: 'teachers',
  },
  LOG_TYPES: {
    ERROR: 'error',
    MESSAGE: 'message'
  },
  ERRORS: {
    UNKOWN_ERROR: 'UNKOWN_ERROR',
    UNAUHORIZED: 'UNAUTHORIZED',
    BAD_PASSWORD: 'BAD_PASSWORD',
    NO_USER: 'NO_USER',
    USER_EXISTS: 'USER_EXISTS',
    NO_SCHOOL: 'NO_SCHOOL',
    TEACHER_EXISTS: 'TEACHER_EXISTS',
    CLASS_EXISTS: 'CLASS_EXISTS',
    STUDENT_EXISTS: 'STUDENT_EXISTS',
  }
}
