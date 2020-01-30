const { find, add, remove } = require('../../helpers/mongoHelper');
exports.register = async (userId) => {
  try {
    const addStudent = {
      students: {}
    }
    let addStudentRes = await add('students', addStudent, {_id: userId});
    return addStudentRes
  } catch (e) {
    console.log('e', e);
    return {
      err: e
    }
  }
}
exports.remove = async (userId) => {
  try {
    const removeData = {
      _id: userId
    }
    let removeStudentRes = await remove('students', removeData);
    return removeStudentRes
  } catch (e) {
    console.log('e', e);
    return {
      err: e
    }
  }
}
