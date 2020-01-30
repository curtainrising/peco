const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const config = require('config');
let db;
exports.find = (collection, options = {}) => {
  return new Promise((resolve,reject) => {
    db.collection(collection).find(options).toArray((err, results) => {
      // console.log(results)
      if (err) return reject(err);

      resolve(results);
    })
  });
}
exports.add = (collection, saveData = {}, options = {}) => {
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
exports.remove = (collection, query = {}) => {
  return new Promise((resolve,reject) => {
    if (!query) {
      reject('No query');
    }
    db.collection(collection).remove(query, (err, results) => {
      if (err) return reject(err);
      console.log(results.result.n + " document(s) deleted");

      resolve();
    })
  });
}
exports.init = (app) => {
  return new Promise((resolve,reject) => {
    MongoClient.connect(config.mongoUrl, (err, client) => {
      if (err) return console.log(err)
      db = client.db('peco')
      resolve();
    });
  })

}
