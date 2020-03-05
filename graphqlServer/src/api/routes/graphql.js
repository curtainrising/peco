const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
const jwt = require('jsonwebtoken')
const { getStudents, getClasses, getTeachers, getSchools, getUsers } = require('../../helpers/testData');
const userControl = require('../control/user');
const schoolControl = require('../control/school');
const teacherControl = require('../control/teachers');
const studentControl = require('../control/students');
const classControl = require('../control/classes');
const constants = require('../../helpers/constants');
const { authenticate } = require('../../helpers/utils');

const schema = buildSchema(`
  type Query {
    authenticate(auth: AuthInput): AuthPayload,
    getSchool(auth: AuthInput): AuthPayload,
    getSchools(auth: AuthInput): SchoolsPayload
  }

  type Mutation {
    login(userName: String!, password: String!): AuthPayload,
    register(userName: String!, password: String!, firstName: String!, lastName: String!): User,
    joinSchool(auth: AuthInput, school: SchoolInput): AuthPayload,
    createSchool(auth: AuthInput, school: SchoolInput): AuthPayload,
    addTeacher(auth: AuthInput, teacher: TeacherInput, students: StudentChangeInput): TeacherPayload,
    updateTeacher(auth: AuthInput, teacher: TeacherInput, students: StudentChangeInput): TeacherPayload,
    deleteTeacher(auth: AuthInput, teacher: TeacherInput, students: StudentChangeInput): TeacherPayload,
    addClass(auth: AuthInput, class: ClassesInput, students: StudentChangeInput): ClassPayload,
    updateClass(auth: AuthInput, class: ClassesInput, students: StudentChangeInput): ClassPayload,
    uploadClass(auth: AuthInput, uploadClass: UploadClassInput): AuthPayload,
    deleteClass(auth: AuthInput, class: ClassesInput, students: StudentChangeInput): ClassPayload,
    addStudent(auth: AuthInput, student: StudentInput): Student,
    updateStudent(auth: AuthInput, student: StudentInput): Student,
    deleteStudent(auth: AuthInput, student: StudentInput): Student,
  }

  type AuthPayload {
    user: User,
    school: SchoolPayload
  }

  input AuthInput {
    userId: String!,
    schoolId: String,
    authToken: String,
  }

  type User {
    userName: String,
    userId: String,
    firstName: String,
    lastName: String,
    schoolId: String,
    authToken: String,
  }

  type SingleSchool {
    schoolName: String,
    schoolId: String
  }

  type SchoolPayload {
    school: SingleSchool,
    students: [Student],
    teachers: [Teacher],
    classes: [Classes]
  }

  input SchoolInput {
    schoolName: String!,
    password: String!
  }

  type SchoolsPayload {
    schools: [SingleSchool]
  }

  type Student {
    firstName: String,
    lastName: String,
    parentEmail: String,
    studentId: String,
    teacherId: String,
    classId: String,
    schoolId: String,
  }

  input StudentInput {
    firstName: String,
    lastName: String,
    parentEmail: String,
    studentId: String,
    teacherId: String,
    classId: String,
    schoolId: String,
  }

  type TeacherPayload {
    teacher: Teacher,
    students: [Student]
  }

  type Teacher {
    firstName: String,
    lastName: String,
    email: String,
    teacherId: String,
    schoolId: String,
  }

  input TeacherInput {
    firstName: String,
    lastName: String,
    email: String,
    teacherId: String,
    schoolId: String,
  }

  type ClassPayload {
    class: Classes,
    students: [Student]
  }

  type Classes {
    className: String,
    classId: String,
    schoolId: String,
  }

  input ClassesInput {
    className: String,
    classId: String,
    schoolId: String,
  }

  input UploadClassInput {
    class: ClassesInput,
    teachers: [TeacherInput],
    students: [StudentInput]
  }

  input StudentChangeInput {
    addStudents: [StudentInput],
    removeStudents: [StudentInput]
  }
`);

const root = {
  login: async (args) => {
    try {
      console.log('args', args);
      let user = await userControl.login(args);
      let school ={
        school: {},
        teachers: [],
        students: [],
        classes: []
      }
      if (user.schoolId) {
        school = await schoolControl.getSchool({schoolId: user.schoolId});
      }
      console.log('school', school);
      console.log('user', user);
      const authToken = jwt.sign({ userId: user.userId }, constants.APP_SECRET);
      return {
        user: () => userControl.getGraphqlSchema({user, authToken}),
        ...schoolControl.getGraphqlSchema(school)
      }
      return userData;
    } catch (e) {
      throw e;
    }

  },
  register: async (args) => {
    try {
      let user = await userControl.register(args);
      const authToken = jwt.sign({ userId: user.userId }, constants.APP_SECRET);
      const userData = userControl.getGraphqlSchema({user, authToken})
      return userData;
    } catch (e) {
      throw e;
    }

  },
  joinSchool: async (args) => {
    try {
      let user = await authenticate(args.auth)
      let data = await schoolControl.joinSchool(args.school);
      let userRes = await userControl.joinSchool(args.auth.userId, data.school.schoolId, user);
      return {
        user: () => userControl.getGraphqlSchema({user, authToken: args.auth.authToken}),
        ...schoolControl.getGraphqlSchema(data)
      }
    } catch (e) {
      throw e;
    }
  },
  createSchool: async (args) => {
    try {
      let user = await authenticate(args.auth)
      let data = await schoolControl.createSchool(args.school);
      let userRes = await userControl.joinSchool(args.auth.userId, data.school.schoolId, user);
      return {
        user: () => userControl.getGraphqlSchema({user, authToken: args.auth.authToken}),
        ...schoolControl.getGraphqlSchema(data)
      }
    } catch (e) {
      throw e;
    }
  },
  getSchool: async (args) => {
    try {
      let user = await authenticate(args.auth)
      let data = await schoolControl.getSchool(args.auth);
      let userRes = await userControl.getUser(args.auth.userId, data.school.schoolId);
      return {
        user: () => userControl.getGraphqlSchema({user, authToken: args.auth.authToken}),
        ...schoolControl.getGraphqlSchema(data)
      }
    } catch (e) {
      throw e;
    }
  },
  getSchools: async (args) => {
    try {
      let user = await authenticate(args.auth)
      let dataRes = await schoolControl.getSchools();
      console.log('dataRes', dataRes);
      return {
        ...schoolControl.getSchoolsGraphqlSchema(dataRes)
      }
    } catch (e) {
      throw e;
    }
  },
  addTeacher: async (args) => {
    try {
      let user = await authenticate(args.auth)
      let teacherRes = await teacherControl.createTeacher(args.teacher, args.schoolId);
      let studentRes = await studentControl.updateStudents(args.students, {teacherId: teacherRes.teacherId});
      return {
        ...teacherControl.getTeacherGraphqlSchema(teacherRes),
        ...studentControl.getGraphqlSchema(studentRes)
      }
    } catch (e) {
      throw e;
    }
  },
  updateTeacher: async (args) => {
    try {
      let user = await authenticate(args.auth)

      let teacherRes = await teacherControl.updateTeacher(args.teacher);
      let studentRes = await studentControl.updateStudents(args.students, {teacherId: teacherRes.teacherId});
      return {
        ...teacherControl.getTeacherGraphqlSchema(teacherRes),
        ...studentControl.getGraphqlSchema(studentRes)
      }
    } catch (e) {
      throw e;
    }
  },
  deleteTeacher: async (args) => {
    let user = await authenticate(args.auth)
    let teacherRes = await teacherControl.deleteTeacher(args.teacher);
    let studentRes = await studentControl.updateStudents(args.students, {teacherId: teacherRes.teacherId});
    return {
      ...teacherControl.getTeacherGraphqlSchema(teacherRes),
      ...studentControl.getGraphqlSchema(studentRes)
    }
  },
  addClass: async (args) => {
    try {
      let user = await authenticate(args.auth)
      console.log('args', args);
      let classRes = await classControl.createClass(args.class);
      let studentRes = await studentControl.updateStudents(args.students, {classId: classRes.classId});
      return {
        ...classControl.getClassGraphqlSchema(classRes),
        ...studentControl.getGraphqlSchema(studentRes)
      }
    } catch (e) {
      throw e;
    }
  },
  updateClass: async (args) => {
    try {
      let user = await authenticate(args.auth)

      let classRes = await classControl.updateClass(args.class);
      let studentRes = await studentControl.updateStudents(args.students, {classId: classRes.classId});
      return {
        ...classControl.getClassGraphqlSchema(classRes),
        ...studentControl.getGraphqlSchema(studentRes)
      }
    } catch (e) {
      throw e;
    }
  },
  deleteClass: async (args) => {
    try {
      let user = await authenticate(args.auth)

      let classRes = await classControl.deleteClass(args.class);
      let studentRes = await studentControl.updateStudents(args.students, {classId: classRes.classId});
      return {
        ...classControl.getClassGraphqlSchema(classRes),
        ...studentControl.getGraphqlSchema(studentRes)
      }
    } catch (e) {
      throw e;
    }
  },
  uploadClass: async (args) => {
    try {
      console.log('args',args);
      let user = await authenticate(args.auth)
      let classRes = await classControl.createClass(args.uploadClass.class);
      let {teachersRes, teacherMap } = await teacherControl.uploadTeachers(args.uploadClass.teachers);
      let studentRes = await studentControl.uploadStudents(args.uploadClass.students, args.auth.schoolId, classRes.classId, teacherMap)

      return {
        user: () => userControl.getGraphqlSchema({user, authToken: args.auth.authToken}),
        ...schoolControl.getGraphqlSchema({school: {},classes: [classRes], teachers: teachersRes, students: studentRes})
      }
    } catch (e) {
      throw e;
    }
  },
  addStudent: async (args) => {
    try {
      let user = await authenticate(args.auth)
      let studentRes = await studentControl.createStudent(args.student, args.auth.schoolId)
      let stuff = studentControl.getStudentGraphqlSchema(studentRes);
      return stuff;
    } catch (e) {
      throw e;
    }
  },
  updateStudent: async (args) => {
    try {
      let user = await authenticate(args.auth)
      let studentRes = await studentControl.updateStudent(args.student)
      let stuff = studentControl.getStudentGraphqlSchema(args.student);
      return stuff;
    } catch (e) {
      throw e;
    }
  },
  deleteStudent: async (args) => {
    try {
      let user = await authenticate(args.auth)
      let studentRes = await studentControl.deleteStudent(args.student)
      let stuff = studentControl.getStudentGraphqlSchema(args.student);
      return stuff;
    } catch (e) {
      throw e;
    }
  },
  authenticate: async (args) => {
    try {
      let user = await authenticate(args.auth)
      let data = await schoolControl.getSchool({schoolId: args.auth.schoolId});
      return {
        user: () => userControl.getGraphqlSchema({user, authToken: args.auth.authToken}),
        ...schoolControl.getGraphqlSchema(data)
      }
    } catch (e) {
      throw e;
    }
  },
}
exports.init = (app) => {
  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
    context: { errorName: 'bad combo' },
    customFormatErrorFn: (err) => {
      return err
    }
  }));
}
