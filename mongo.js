const { MongoClient, ObjectID } = require('mongodb');
const util = require('util');

util.promisify(MongoClient.connect);

const { MONGO_URI, MONGO_DB_NAME } = process.env;
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


MongoClient.connect(MONGO_URI, { useNewUrlParser: true }, (err, client) => {

  if (err) throw err;

  const db = client.db("ShippingService");

  let collection = db.collection('shippingInfo');
  let query = { status: "delivered" }

  collection.findOne(query).then(doc => {

      console.log(doc);

  }).catch((err) => {

      console.log(err);
  }).finally(() => {

      client.close();
  });
});



module.exports = {
  mongoClient,
  ObjectID
};




