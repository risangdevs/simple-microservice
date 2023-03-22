const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
let db;
const connect = () => {
  return client
    .connect()
    .then(() => {
      db = client.db("db");
    })
    .catch((err) => {
      throw err;
    });
};
const getDatabase = () => {
  return db;
};
module.exports = { connect, getDatabase };
