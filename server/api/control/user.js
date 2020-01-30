const { find, add, remove } = require('../../helpers/mongoHelper');
const { User } = require('../models/user');
const classes = require('./classes');
const students = require('./students');
const teachers = require('./teachers');
exports.login = async (loginData) => {
  try {
    console.log('loginData',loginData);
    let userRes = await find('users',loginData);
    if (userRes.length !== 1) {
      throw new Error('does not match');
    }
    let user = userRes[0];
    let students = (await find('students', {_id: userRes[0]._id}))[0].students;
    let classes = (await find('classes', {_id: userRes[0]._id}))[0].classes;
    let teachers = (await find('teachers', {_id: userRes[0]._id}))[0].teachers;
    let data = User.setupUserFromData(user, students, classes, teachers);
    console.log('data',data);
    return data;
  } catch (e) {
    console.log('e', e);
    return {
      err: e
    }
  }
}
exports.register = async (registerData) => {
  try {
    let findData = {userName: registerData.userName}
    let findUserRes = await find('users',findData);
    if (findUserRes.length >= 1) {
      throw new Error('user already exists');
    }
    let addUserRes = await add('users', registerData);
    let addStudentRes = await students.register(addUserRes._id)
    let addClassRes = await classes.register(addUserRes._id)
    let addTeacherRes = await teachers.register(addUserRes._id)
    let data = User.setupUserFromData(addUserRes, addStudentRes.students, addClassRes.classes, addTeacherRes.teachers);
    return data
  } catch (e) {
    console.log('e', e);
    return {
      err: e
    }
  }
}
exports.remove = async (removeData) => {
  try {
    let findData = {userName: removeData.userName}
    let findUserRes = await find('users',findData);
    if (findUserRes.length !== 1) {
      throw new Error('user does not exist');
    }
    let userId = findUserRes[0]._id;
    let removeUserRes = await remove('users', {_id: userId});
    let removeStudentRes = await students.remove(userId)
    let removeClassRes = await classes.remove(userId)
    let removeTeacherRes = await teachers.remove(userId)
    // let data = User.setupUserFromData(addUserRes, addStudentRes, addClassRes, addTeacherRes);
    return {success: 'ok'}
  } catch (e) {
    console.log('e', e);
    return {
      err: e
    }
  }
}
