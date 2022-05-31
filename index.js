 const express = require('express');
 const axios = require('axios');
 const cors = require("cors");
 const port = 3000;
 const app = express();
 app.use(cors());
 app.use(express.json());
 const { mongoClient } = require('./mongo.js');
const BodyParser = require("body-parser");
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));
const ObjectId = require("mongodb").ObjectId;





 
//  app.get('/', async (req,res) => {
//    const db = await mongoClient();
//    if (!db) res.status(500).send('Systems Unavailable');
 
//    const { data } = await axios.get('https://goweather.herokuapp.com/weather/california');
//    await db.collection('weather').insertOne(data);
 
//    return res.send(data);
// //  });
// let myquery = { _id: ObjectId( req.params.id )};
// db_connect
//     .collection("shippingInfo")
//     .findOne(myquery, function (err, result) {
//       if (err) throw err;
      
//     });


 
 app.get('/shipments/:orderId', async (req, res) => {
 
  const db = await mongoClient();
  if (!db) res.status(500).send("No db connection");
 
  const orderId  = { _id: ObjectId( req.params.id )};
 const results = await db.collection('shipments').findOne({orderId}) ;
   
  return res.status(200).json(results);
});

 
app.post('/shipments', async (req, res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send("No db connection");
 
  const { orderId } = req.body;
  const newShipment = {
    orderId,
    status: 'CREATED'
  };
  const results = await db.collection('shippingInfo').insertOne(newShipment);
  return res.status(200).send(results);
});

app.patch('/shipments/:orderId', async (req, res) => {
  const db = await mongoClient();
  if (!db) res.status(500).send("No db connection");
 
  const { orderId } = req.params;
  const result = await db.collection('shippingInfo').findOne({ orderId });
 
  // CREATED | SHIPPED | DELIVERED
 
  const updateShipmentStatus = {
    CREATED: 'SHIPPED',
    SHIPPED: 'DELIVERED',
  }[result.status];
 
  const results = await db.collection('shippingInfo').updateOne({ orderId }, { status: updateShipmentStatus });
  return res.status(200).send(results);
});



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

//const shipmentRoutes=require('./routes/shippment.js');
//app.use('/shipments',shipmentRoutes);

