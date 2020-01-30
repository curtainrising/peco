const { find, add, remove } = require('../../helpers/mongoHelper');
exports.register = async (userId) => {
  try {
    const addClass = {
      classes: {}
    }
    let addClassRes = await add('classes', addClass, {_id: userId});
    return addClassRes
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
    let removeClassRes = await remove('classes', removeData);
    return removeClassRes
  } catch (e) {
    console.log('e', e);
    return {
      err: e
    }
  }
}
