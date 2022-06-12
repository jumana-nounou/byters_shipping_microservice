const express = require('express');
 const axios = require('axios');
 const cors = require("cors");
 const port = 3000;
 const app = express();
 //const { uuid } = require('uuidv4');

 app.use(cors({
  origin:'*'
 }));
 app.use(express.json());
 const { mongoClient } = require('./mongo.js');
const BodyParser = require("body-parser");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});



 
//  app.get('/', async (req,res) => {
//    const db = await mongoClient();
//    if (!db) res.status(500).send('Systems Unavailable');
 
//    const { data } = await axios.get('https://goweather.herokuapp.com/weather/california');
//    await db.collection('weather').insertOne(data);
 
//    return res.send(data);
//  });



 

 app.get('/shipments/:orderId', async (req, res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send("No db connection");
  //const {orderId}=req.params.mongoClient.ordId;
  var i=Number(req.params.orderId)
  //const { orderId } = req.params;
  //const orderId  = { _id: ObjectId( req.params.oid )};
 const results = await db.collection('shipments').findOne({"orderNo":i}) ;
  console.log(i)
  console.log(results)
  return res.status(200).send(results);
});


var o=4;
app.post('/shipments', async (req, res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send("No db connection");
 
  // const { orderNo } = req.body;
  //   if (!orderNo) return res.status(403).send('orderNo is required');

  //   const shipment = await db.collection('shipments').findOne({ orderNo });
  //   if (shipment) return res.status(403).send('Document already exists, cannot create');
  //const { orderId } = req.body;
  const newShipment = {
    //orderId:uuid(),
    orderNo:o,
    status: 'CREATED'
  };
  o=o+1
  const results = await db.collection('shipments').insertOne(newShipment);
  return res.status(200).send(results);
});

app.patch('/shipments/:orderId', async (req, res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send("No db connection");
 
 var x= Number(req.params.orderId)
 console.log(x);
 const result = await db.collection('shipments').findOne({"orderNo":x}) ;

  const updateShipmentStatus = {
    CREATED: 'SHIPPED',
    SHIPPED: 'DELIVERED',
  } [result.status];

  const results = await db.collection('shipments').updateOne({ "orderNo":x }, { $set: { "status" : updateShipmentStatus } });
  return res.status(200).send(results);
});




app.patch('/shipments/cancel/:orderId/', async (req, res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send("No db connection");
 
 var x= Number(req.params.orderId)
 console.log(x);
 const result = await db.collection('shipments').findOne({"orderNo":x}) ;
  if(result.status=='CREATED');
  const updateShipmentStatus = {
    CREATED: 'CANCELED'
  } [result.status];

  const results = await db.collection('shipments').updateOne({ "orderNo":x }, { $set: { "status" : updateShipmentStatus } });
  return res.status(200).send(results);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
// to cancel shipment


//const shipmentRoutes=require('./routes/shippment.js');
//app.use('/shipments',shipmentRoutes);