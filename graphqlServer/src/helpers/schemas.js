const getUserSchema = () => ({
  userName: '',
  firstName: '',
  lastName: '',
  password: '',
  userType: '',
  userId: '',
  schoolId: '',
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
  getStudentSchema,
  getTeacherSchema,
  getClassSchema,
  getSchoolSchema,
}
