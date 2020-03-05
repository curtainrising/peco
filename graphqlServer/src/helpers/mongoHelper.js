const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('config');
const testData = require('./testData');
const { COLLECTION: { USERS, SCHOOL, CLASSES, STUDENTS, TEACHERS }} = require('./constants');
let db;

const find = (collection, options = {}) => {
  return new Promise((resolve,reject) => {
    db.collection(collection).find(options).toArray((err, results) => {
      // console.log('results', results)
      if (err) return reject(err);

      resolve(results);
    })
  });
}
exports.find = find;

const add = (collection, saveData = {}, options = {}) => {
  if (options._id) {
    saveData._id = new ObjectID(options._id);
  }
  return new Promise((resolve,reject) => {
    db.collection(collection).insertOne(saveData, (err, results) => {
      // console.log('results',results.ops[0])
      if (err) return reject(err);

      resolve(results.ops[0]);
    })
  });
}
exports.add = add;

const addMany = (collection, saveDataArr = [], options = {}) => {
  return new Promise((resolve,reject) => {
    db.collection(collection).insertMany(saveDataArr, (err, results) => {
      // console.log('results',results.ops[0])
      if (err) return reject(err);

      resolve(results.ops);
    })
  });
}
exports.addMany = addMany;

exports.remove = (collection, query = {}) => {
  return new Promise((resolve,reject) => {
    if (!query) {
      reject('No query');
    }
    db.collection(collection).remove(query, (err, results) => {
      if (err) return reject(err);
      // console.log(results.result.n + " document(s) deleted");

      resolve();
    })
  });
}
exports.update = (collection, queryData, saveData, options = {}) => {
  return new Promise((resolve,reject) => {
    db.collection(collection).update(queryData, saveData, options, (err, results) => {
      if (err) return reject(err);

      resolve(results);
    })
  });
}

exports.updateAndReturn = (collection, queryData, saveData, options = {}) => {
  return new Promise((resolve,reject) => {
    db.collection(collection).update(queryData, saveData, {returnNewDocument: true, ...options}, (err, results) => {
      if (err) return reject(err);

      resolve(results);
    })
  });
}

const insertTestData = async () => {
  try {
    let userRes = await find(USERS, testData.getUsers()[0].userId)
    if (userRes.length < 1) {
      let userTestData = testData.getUsers();
      let schoolTestData = testData.getSchools();
      let studentTestData = testData.getStudents();
      let teacherTestData = testData.getTeachers();
      let classTestData = testData.getClasses();

        console.log('inserting test data');
        let promises = [];
        userTestData.forEach(item => promises.push(add(USERS, item)));
        schoolTestData.forEach(item => promises.push(add(SCHOOL, item)));
        studentTestData.forEach(item => promises.push(add(STUDENTS, item)));
        teacherTestData.forEach(item => promises.push(add(TEACHERS, item)));
        classTestData.forEach(item => promises.push(add(CLASSES, item)));
        Promise.all(promises).then(res => {
          console.log('Successfully insterted test data');
        }).catch(e => {
          console.log('was not able to insert test data');
          console.log('e',e);
        })
      } else {
        console.log('Test data already inserted');
      }
    } catch (e) {
      console.log("was not able to fetch test data");
      console.log('e',e);
    }
}
exports.init = (app) => {
  return new Promise((resolve,reject) => {
    MongoClient.connect(config.mongoUrl, (err, client) => {
      if (err) return console.log('err', err)
      // console.log('here');
      db = client.db('peco')
      insertTestData()
      resolve();
    });
  })

}
