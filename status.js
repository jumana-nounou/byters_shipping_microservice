const {MongoClient } = require("mongodb");
const express=require("express");
const axios=require("axios");
const {MONGO_URI , MONGO_DB_NAME } = process.env;

const client = new MongoClient("MONGO_URI");

const app=express();


// app.get('/',(req,res)=>{
//     res.send('hi')
// }

// )
// app.listen(8080);