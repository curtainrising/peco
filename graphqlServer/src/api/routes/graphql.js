// const graphqlHTTP = require('express-graphql');
const { createYoga, createSchema, maskError  } = require('graphql-yoga');
var { createHandler } = require("graphql-http/lib/use/express")
const { buildSchema, GraphQLError } = require('graphql');
const jwt = require('jsonwebtoken')
const { getStudents, getClasses, getTeachers, getSchools, getUsers } = require('../../helpers/testData');
const userControl = require('../control/user');
const schoolControl = require('../control/school');
const teacherControl = require('../control/teachers');
const studentControl = require('../control/students');
const classControl = require('../control/classes');
const constants = require('../../helpers/constants');
const { authenticate } = require('../../helpers/utils');

const schema = createSchema({
  typeDefs: `

    type Query {
      authenticate: AuthPayload,
      getSchool: AuthPayload,
      getSchools: SchoolsPayload
    }

    type Mutation {
      login(userName: String!, password: String!): AuthPayload,
      register(userName: String!, password: String!, firstName: String!, lastName: String!): User,
      joinSchool(school: SchoolInput): AuthPayload,
      createSchool(school: SchoolInput): AuthPayload,
      addTeacher(teacher: TeacherInput, students: StudentChangeInput): TeacherPayload,
      updateTeacher(teacher: TeacherInput, students: StudentChangeInput): TeacherPayload,
      deleteTeacher(teacher: TeacherInput, students: StudentChangeInput): TeacherPayload,
      addClass(class: ClassesInput, students: StudentChangeInput): ClassPayload,
      updateClass(class: ClassesInput, students: StudentChangeInput): ClassPayload,
      uploadClass( uploadClass: UploadClassInput): AuthPayload,
      deleteClass(class: ClassesInput, students: StudentChangeInput): ClassPayload,
      addStudent(student: StudentInput): Student,
      updateStudent(student: StudentInput): Student,
      deleteStudent(student: StudentInput): Student,
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
`,
  resolvers: {
    Query: {
      authenticate: async (parent, args, context) => {
        console.log('authenticate')
        let user = await authenticate(context.authData)
        let data;
        console.log('user', user);
        if (user.schoolId) {
          data = await schoolControl.getSchool({schoolId: user.schoolId});
        }
        console.log('data', data);
        return {
          user: () => userControl.getGraphqlSchema({user}),
          ...(data ? schoolControl.getGraphqlSchema(data) : {})
        }
      },
      getSchools: async (parent, args, context) => {
        console.log('getSchools')
        let user = await authenticate(context.authData)
        let dataRes = await schoolControl.getSchools();
        console.log('dataRes', dataRes);
        return {
          ...schoolControl.getSchoolsGraphqlSchema(dataRes)
        }
      },
    },
    Mutation: {
      login: async (parent, args, context) => {
        console.log('login')
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
        return {
          user: () => userControl.getGraphqlSchema({user}),
          ...schoolControl.getGraphqlSchema(school)
        }
      },
      register: async (parent, args, context) => {
        console.log('register')
        let user = await userControl.register(args);
        const userData = userControl.getGraphqlSchema({user})
        return userData;
      },
      joinSchool: async (parent, args, context) => {
        console.log('joinSchool')
        let user = await authenticate(context.authData)
        let data = await schoolControl.joinSchool(args.school);
        let userRes = await userControl.joinSchool(user.userId, data.school.schoolId, user);
        return {
          user: () => userControl.getGraphqlSchema({user: userRes}),
          ...schoolControl.getGraphqlSchema(data)
        }
      },
      addStudent: async (parent, args, context) => {
        console.log('addStudent')
        let user = await authenticate(context.authData)
        let studentRes = await studentControl.createStudent(args.student, user.schoolId)
        let stuff = studentControl.getStudentGraphqlSchema(studentRes);
        return stuff;
      },
      deleteStudent: async (parent, args, context) => {
        console.log('deleteStudent')
        let user = await authenticate(context.authData)
        let studentRes = await studentControl.deleteStudent(args.student)
        let stuff = studentControl.getStudentGraphqlSchema(args.student);
        return stuff;
      },
      updateStudent: async (parent, args, context) => {
        console.log('updateStudent')
        let user = await authenticate(context.authData)
        let studentRes = await studentControl.updateStudent(args.student)
        let stuff = studentControl.getStudentGraphqlSchema(studentRes);
        return stuff;
      },
      addTeacher: async (parent, args, context) => {
        console.log('addTeacher')
        let user = await authenticate(context.authData)
        let teacherRes = await teacherControl.createTeacher(args.teacher, args.schoolId);
        let studentRes = await studentControl.updateStudents(args.students, {teacherId: teacherRes.teacherId});
        return {
          ...teacherControl.getTeacherGraphqlSchema(teacherRes),
          ...studentControl.getGraphqlSchema(studentRes)
        }
      },
      updateTeacher: async (parent, args, context) => {
        console.log('updateTeacher')
        let user = await authenticate(context.authData)
        let teacherRes = await teacherControl.updateTeacher(args.teacher);
        let studentRes = await studentControl.updateStudents(args.students, {teacherId: teacherRes.teacherId});
        return {
          ...teacherControl.getTeacherGraphqlSchema(teacherRes),
          ...studentControl.getGraphqlSchema(studentRes)
        }
      },
      deleteTeacher: async (parent, args, context) => {
        console.log('deleteTeacher')
        let user = await authenticate(context.authData)
        let teacherRes = await teacherControl.deleteTeacher(args.teacher);
        let studentRes = await studentControl.updateStudents(args.students, {teacherId: teacherRes.teacherId});
        return {
          ...teacherControl.getTeacherGraphqlSchema(teacherRes),
          ...studentControl.getGraphqlSchema(studentRes)
        }
      },
      addClass: async (parent, args, context) => {
        console.log('addClass')
        let user = await authenticate(context.authData)
        let classRes = await classControl.createClass(args.class);
        let studentRes = await studentControl.updateStudents(args.students, {classId: classRes.classId});
        return {
          ...classControl.getClassGraphqlSchema(classRes),
          ...studentControl.getGraphqlSchema(studentRes)
        }
      },
      updateClass: async (parent, args, context) => {
        console.log('updateClass')
        let user = await authenticate(context.authData)
        let classRes = await classControl.updateClass(args.class);
        let studentRes = await studentControl.updateStudents(args.students, {classId: classRes.classId});
        return {
          ...classControl.getClassGraphqlSchema(classRes),
          ...studentControl.getGraphqlSchema(studentRes)
        }
      },
      deleteClass: async (parent, args, context) => {
        console.log('updateClass')
        let user = await authenticate(context.authData)
        let classRes = await classControl.deleteClass(args.class);
        let studentRes = await studentControl.updateStudents(args.students, {classId: classRes.classId});
        return {
          ...classControl.getClassGraphqlSchema(classRes),
          ...studentControl.getGraphqlSchema(studentRes)
        }
      },
      uploadClass: async (parent, args, context) => {
        console.log('updateClass')
        let user = await authenticate(context.authData)
        let classRes = await classControl.createClass(args.uploadClass.class);
        console.log('classRes', classRes);
        let {teachersRes, teacherMap } = await teacherControl.uploadTeachers(args.uploadClass.teachers);
        let studentRes = await studentControl.uploadStudents(args.uploadClass.students, user.schoolId, classRes.classId, teacherMap)
  
        return {
          user: () => userControl.getGraphqlSchema({user, authToken: args.auth.authToken}),
          ...schoolControl.getGraphqlSchema({school: {},classes: [classRes], teachers: teachersRes, students: studentRes})
        }
      },
    },
  },
});


  
 

exports.init = (app) => {
  app.use('/graphql', createYoga({
    schema: schema,
    graphql: true,
    context: async req => {
      console.log('context');
      const authToken = req.request.headers.get('authorization');
      const userId = req.request.headers.get('userid')
      return {
        authData: {
          authToken, userId
        }
      }
    },
    maskedErrors: {
      maskError(error, message, isDev) {
        console.log('mask-error', error);
        console.log('mask-message', message);
        console.log('mask-isDev', isDev);
        let myError = error;
        if (error && (!error.extensions || !error.extensions.code)) {
          console.log('not graphql error');
          myError = new GraphQLError(
            error.message,
            {
              extensions: {
                code: constants.ERRORS.UNKOWN_ERROR,
              }
            }
          );
        }
        return maskError(myError, message, isDev)
      }
    }
  }))
}
