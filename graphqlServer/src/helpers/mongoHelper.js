const { MongoClient, ObjectId } = require('mongodb')
const { GraphQLError } = require('graphql');
const config = require('config');
const jwt = require('jsonwebtoken')
const testData = require('./testData');
const { COLLECTION: { USERS, SCHOOL, CLASSES, STUDENTS, TEACHERS }, DBNAME, ERRORS, APP_SECRET} = require('./constants');
let db;
const mongoUrl = process.env.MONGO_URL;
exports.getObjectId = () => {
  return new ObjectId();
}
const find = async (collection, options = {}) => {
  const res = await db.collection(collection).find(options).toArray();
  return res;
}
exports.find = find;

const add = async (collection, saveData = {}, options = {}) => {
  const res = await db.collection(collection).insertOne(saveData);
  return res;
}
exports.add = add;

const addMany = async (collection, saveDataArr = [], options = {}) => {
  const res = db.collection(collection).insertMany(saveDataArr);
  return res
}
exports.addMany = addMany;

exports.remove = (collection, query = {}) => {
  if (!query) {
    console.log('mongodb-remove: No query');
    throw new GraphQLError(
      ERRORS.UNKOWN_ERROR,
      {
        extensions: {
          code: ERRORS.UNKOWN_ERROR,
        }
      }
    );
  }
  db.collection(collection).deleteOne(query);
}
exports.update = async (collection, queryData, saveData, options = {}) => {
  const res = await db.collection(collection).updateMany(queryData, saveData, options);
  return res;
}

exports.updateAndReturn = async (collection, queryData, saveData, options = {}) => {
  const res = await db.collection(collection).findOneAndUpdate(queryData, saveData, {upsert: true, returnDocument: 'after', ...options});
  return res;
}

const insertTestData = async () => {
  try {
    let userRes = await find(USERS, {userId: testData.getUsers()[0].userId})
    console.log('userRes', userRes);
    if (userRes.length < 1) {
      let userTestData = testData.getUsers();
      let schoolTestData = testData.getSchools();
      let studentTestData = testData.getStudents();
      let teacherTestData = testData.getTeachers();
      let classTestData = testData.getClasses();

        console.log('inserting test data');
        let promises = [];
        userTestData.forEach(item => {
          item.authToken = jwt.sign({ userId: item.userId }, APP_SECRET);
          promises.push(add(USERS, item))
        });
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

exports.init = async (app) => {
  console.log('config', config);
  console.log('process.env', process.env);
  const url = mongoUrl || "mongodb://root:example@localhost:27017";
  console.log('mongoUrl', url);
  client = new MongoClient(url)
  await client.connect()
  console.log('Connected successfully to server')
  db = client.db(DBNAME)
  insertTestData()
}