// payloads
export const getUserPayload = () => `
userName,
userId,
firstName,
lastName,
schoolId,
authToken
`

export const getStudentPayload = () => `
firstName,
lastName,
parentEmail,
studentId,
teacherId,
classId,
schoolId
`

export const getTeacherPayload = () => `
firstName,
lastName,
email,
teacherId,
schoolId
`

export const getClassPayload = () => `
className,
classId,
schoolId
`
export const getSingleSchool = () =>`
schoolName,
schoolId
`
export const getSchoolsPayload = () =>`
schools {
  ${getSingleSchool()}
}
`;
export const getSchoolPayload = () => `
school {
  ${getSingleSchool()}
}
students {
  ${getStudentPayload()}
},
teachers {
  ${getTeacherPayload()}
},
classes {
  ${getClassPayload()}
}
`

export const getTeacherResponsePayload = () => `
teacher {
  ${getTeacherPayload()}
},
students {
  ${getStudentPayload()}
}
`

export const getClassResponsePayload = () => `
class {
  ${getClassPayload()}
},
students {
  ${getStudentPayload()}
}
`

export const getAuthPayload = () => `
user {
  ${getUserPayload()}
},
school {
  ${getSchoolPayload()}
}
`


// inputs
export const authInput = ({userId, authToken, schoolId}) => `
auth: {
  userId: "${userId}"
  authToken: "${authToken}"
  ${schoolId ? `schoolId: "${schoolId}"` : ''}
}
`
export const schoolInput = ({schoolName, password}) => `
school: {
  schoolName: "${schoolName}"
  password: "${password}"
}
`

export const classInput = ({className, classId, schoolId}) => `
class: {
  className: "${className}"
  schoolId: "${schoolId}"
  ${classId ? `classId: "${classId}"` : ''}
}
`

export const teacherMapInput = ({firstName, lastName, email, teacherId = '', schoolId}) => `
{
  firstName: "${firstName}"
  lastName: "${lastName}"
  schoolId: "${schoolId}"
  email: "${email}"
  teacherId: "${teacherId}"
}
`

export const teacherInput = (teacher) => `
teacher: ${teacherMapInput(teacher)}
`

export const studentMapInput = ({firstName = '', lastName = '', parentEmail = '', studentId = '', teacherId = '', classId = '', schoolId = ''}) => `
{
  ${firstName ? `firstName: "${firstName}",`: ''}
  ${lastName ? `lastName: "${lastName}",`: ''}
  ${parentEmail ? `parentEmail: "${parentEmail}",`: ''}
  ${studentId !== '' ? `studentId: "${studentId}",`: ''}
  ${teacherId !== '' ? `teacherId: "${teacherId}",`: ''}
  ${classId !== '' ? `classId: "${classId}",`: ''}
  ${schoolId !== '' ? `schoolId: "${schoolId}"`: ''}
}
`

export const studentsInput = ({mappedStudentsInList, mappedStudentsNotInList}) => `
students: {
  ${mappedStudentsInList.length ? `addStudents: [${mappedStudentsInList.map(studentMapInput)}]` : ''}
  ${mappedStudentsNotInList.length ? `removeStudents: [${mappedStudentsNotInList.map(studentMapInput)}]` : ''}
}
`;

export const studentInput = (student) => `
student: ${studentMapInput(student)}
`

export const uploadClassInput = (data) => `
uploadClass: {
  students: [${data.students.map(studentMapInput)}],
  ${classInput(data.class)},
  teachers: [${data.teachers.map(teacherMapInput)}]
}
`

// functions - mutations
export const getLoginFunc = ({userName, password}) => `
login(
  userName: "${userName}"
  password: "${password}"
)
`
export const getRegisterFunc = ({userName, password, firstName, lastName}) => `
register(
  userName: "${userName}"
  password: "${userName}"
  firstName: "${userName}"
  lastName: "${userName}"
)
`
export const joinSchoolFunc = ({user, school}) => `
joinSchool(
  ${authInput(user)}
  ${schoolInput(school)}
)
`

export const addClassFunc = ({user, classData, students}) => `
addClass (
  ${authInput(user)}
  ${classInput(classData)}
  ${studentsInput(students)}
)
`

export const updateClassFunc = ({user, classData, students}) => `
updateClass (
  ${authInput(user)}
  ${classInput(classData)}
  ${studentsInput(students)}
)
`

export const deleteClassFunc = ({user, classData, students}) => `
deleteClass (
  ${authInput(user)}
  ${classInput(classData)}
  ${studentsInput(students)}
)
`

export const uploadClassFunc = ({user, uploadData}) => `
uploadClass (
  ${authInput(user)}
  ${uploadClassInput(uploadData)}
)
`

export const addTeacherFunc = ({user, teacherData, students}) => `
addTeacher (
  ${authInput(user)}
  ${teacherInput(teacherData)}
  ${studentsInput(students)}
)
`

export const updateTeacherFunc = ({user, teacherData, students}) => `
updateTeacher (
  ${authInput(user)}
  ${teacherInput(teacherData)}
  ${studentsInput(students)}
)
`

export const deleteTeacherFunc = ({user, teacherData, students}) => `
deleteTeacher (
  ${authInput(user)}
  ${teacherInput(teacherData)}
  ${studentsInput(students)}
)
`
export const addStudentFunc = ({user, student}) => `
addStudent (
  ${authInput(user)}
  ${studentInput(student)}
)
`

export const updateStudentFunc = ({user, student}) => `
updateStudent (
  ${authInput(user)}
  ${studentInput(student)}
)
`

export const deleteStudentFunc = ({user, student}) => `
deleteStudent (
  ${authInput(user)}
  ${studentInput(student)}
)
`

// functions - query
export const authenticateFunc = ({userId, authToken, schoolId}) => `
authenticate(
  ${authInput({userId, authToken, schoolId})}
)
`

export const getSchoolsFunc = ({userId, authToken}) => `
getSchools(
  ${authInput({userId, authToken})}
)
`;

// mutation
export const mutation = (func, payload) => `
mutation {
  ${func}
  {
    ${payload}
  }
}
`

export const query = (func, payload) => `
{
  ${func}
  {
    ${payload}
  }
}
`
