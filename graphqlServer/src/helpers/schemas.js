const getUserSchema = () => ({
  userName: '',
  firstName: '',
  lastName: '',
  password: '',
  userType: '',
  userId: '',
  schoolId: '',
})

const getOwnUserSchema = () => ({
  userName: '',
  firstName: '',
  lastName: '',
  password: '',
  userType: '',
  userId: '',
  schoolId: '',
  authToken: '',
})

const getStudentSchema = () => ({
  firstName: '',
  lastName: '',
  parentEmail: '',
  studentId: '',
  teacherId: '',
  classId: '',
  schoolId: '',
})

const getTeacherSchema = () => ({
  firstName: '',
  lastName: '',
  teacherId: '',
  schoolId: '',
})

const getClassSchema = () => ({
  className: '',
  classId: '',
  schoolId: '',
})

const getSchoolSchema = () => ({
  schoolName: '',
  password: '',
  schoolId: '',
})

module.exports = {
  getUserSchema,
  getOwnUserSchema,
  getStudentSchema,
  getTeacherSchema,
  getClassSchema,
  getSchoolSchema,
}
