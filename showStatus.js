require('dotenv').config();

const {MongoClient } = require('mongodb');
const express=require('express');
const axios=require('axios');
const {MONGO_URI , MONGO_DB_NAME } = process.env;
const client = new MongoClient(MONGO_URI);
const router=express.Router();
  

router.get('/',(req,res)=>{

  res.send( MongoClient.connect(MONGO_URI, { useNewUrlParser: true }, (err, client) => {

  if (err) throw err;

  const db = client.db(MONGO_DB_NAME);

  let collection = db.collection('shippingInfo');

  let query = { status :"RETURNED" }

  collection.findOne(query).then(doc => {

   console.log(doc);

  }).catch((err) => {

      console.log(err);
  }).finally(() => {

      client.close();
  });
}))
});

module.exports=router;









// app.get('/',(req,res)=>{
//     res.send('hi')
// }

// )
// app.listen(8080);