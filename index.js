require('dotenv').config();
const express = require('express');
const axios = require('axios');
const { mongoClient } = require('mongodb');
const app = express();
const {MONGO_URI , MONGO_DB_NAME } = process.env;
//const client=new MongoClient(MONGO_URI);



app.get('/', async (req,res) => {

  const db =await client.connect();
  if (!db) res.status(500).send('Systems Unavailable');

  const { data } = await axios.get('https://localhost:8080');
  await db.collection('shippingInfo').insertOne(data);

  return res.send("a7a");
});
//app.listen(8080);

// app.get('/', async (req,res)=>{

//   res.send( MongoClient.connect(MONGO_URI, { useNewUrlParser: true }, (err, client) => {

//   if (err) throw err;

//   const db = client.db("ShippingService");

//   let collection = db.collection('shippingInfo');
  
//  // const {id}= req.client.db("ShippingService").findOne(q);
//   let query = { status }

//   collection.find(query).then(doc => {

//       console.log(doc);

//   }).catch((err) => {

//       console.log(err);
//   }).finally(() => {

//       client.close();
//   });
// }))
// });
// app.listen(8080);
//app.post

//app.patch to update



// app.get("/",(req,res)=>{
//    res.send("a7a");
// });
// app.listen(8080);

