//require('dotenv').config();
 const express = require('express');
 const axios = require('axios');
 const cors = require("cors");
 require("dotenv").config();
 const port = 3000;
 const app = express();
 app.use(cors());
 app.use(express.json());
 const {MONGO_URI , MONGO_DB_NAME } = process.env;

const{MongoClient} = require("mongodb");

const BodyParser = require("body-parser");

const ObjectId = require("mongodb").ObjectID;
 const client=new MongoClient(MONGO_URI);

// const port =process.env.PORT ||9000
// const showStatus= require('./showStatus');



//app.use('/showStatus',showStatus);

app.get('/home', async (req,res) => {

  return res.send("Hello world!");
  //  const db =await client.connect();
  //  if (!db) res.status(500).send('Systems Unavailable');

  // const { data } = await axios.get('https://localhost:3000'); //da beya3mel eh 
  // await db.collection('shippingInfo').findOne(data);

  // return res.send(data);
});
//app.listen(9000);


 
app.listen(port, () => {
  // perform a database connection when server starts
  console.log(`Server is running on port: ${port}`);
});
// const filteredDocs = await collection.find({ a: 3 }).toArray();
// console.log('Found documents filtered by { a: 3 } =>', filteredDocs);

//app.post

//app.patch to update


// app.use(BodyParser.json());
// app.use(BodyParser.urlencoded({ extended: true }));
// app.listen(8080, () => {});


