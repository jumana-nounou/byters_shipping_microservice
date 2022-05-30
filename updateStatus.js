require('dotenv').config();
 const express = require('express');
 const axios = require('axios');

 const app = express();
 const {MONGO_URI , MONGO_DB_NAME } = process.env;
const{MongoClient} = require("mongodb");
const ObjectId = require("mongodb").ObjectID;



app.get('/', async (req,res) => {

   MongoClient.connect(MONGO_URI, { useNewUrlParser: true }, (error, client) => {
    if(error) {
        throw error;
    }

    database = client.db(MONGO_DB_NAME);
    collection = database.collection("shippingInfo");
    const query = { _id: "33" };
    const update = { $set: { status: "Delivered"}};
    const options = {};
    collection.updateOne(query, update, options);

    console.log("Status Updated" + MONGO_DB_NAME + "`!");
  });
 
 });

 /* 
ha3mel functions beta3et create shippment wa update wa get 
create hatakhod id wa status 
function bet update bakhod el id wa baghayar el status 
ha3mel route folder wa gowa shippment routes wa gowah el functions beta3et el controller





 */