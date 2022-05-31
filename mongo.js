require("dotenv").config();
const { MongoClient, ObjectID } = require('mongodb');
const util = require('util');
const { MONGO_URI, MONGO_DB_NAME } = process.env;

util.promisify(MongoClient.connect);


console.log('MONGO_URI :>> ', MONGO_URI);
console.log('MONGO_DB_NAME :>> ', MONGO_DB_NAME);
let dbConnection;

const connect = async () => {
  try {
    const client = await MongoClient.connect(MONGO_URI);
    dbConnection = client.db(MONGO_DB_NAME);
    
  } catch (e) {
    throw new Error(`Could not establish database connection: ${e}`);
  }
};

const mongoClient = async () => {
  if (!dbConnection) {
    await connect();
  }
  return dbConnection;
};



module.exports = {
  mongoClient,
  ObjectID
};



