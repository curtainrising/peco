const { find, add, remove } = require('../../helpers/mongoHelper');
exports.register = async (userId) => {
  try {
    const addTeacher = {
      teachers: {}
    }
    let addTeacherRes = await add('teachers', addTeacher, {_id: userId});
    return addTeacherRes
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
    let removeTeachersRes = await remove('teachers', removeData);
    return removeTeachersRes
  } catch (e) {
    console.log('e', e);
    return {
      err: e
    }
  }
}
