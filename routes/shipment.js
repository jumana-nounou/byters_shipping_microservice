const express=require('express');

const router=express.Router();
  
const ObjectId=require("mongodb").ObjectId;
const dbo = require("../mongo");


//get status beta3et ID wahed 

// app.get('/shipments/:orderId', async (req, res) => {
//   

//   const { orderId } = req.params;
//   const results = await db.collection('shipments').findOne({ orderId });
//   return res.status(200).send(results);
// });

router.route("/showStatus/:orderId").get(function (req, res) {
 
  let db_connect = dbo.getDb("ShippingService");
  if (!db_connect) res.status(500).send("No db connection");
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("shippingInfo")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.status(200).json(result);
      });
 });



 // create new shippment

// app.post('/shipments', async (req, res) => {
//   if (!db) res.status(500).send("No db connection");

//   const { orderId } = req.body; 
//   const newShipment = {
//     orderId,
//     status: 'CREATED'
//   };
//   const results = await db.collection('shipments').insertOne(newShipment);
//   return res.status(200).send(results);
// });

router.route("/showStatus/addNewShippment").post(function (req, response) {
  if (!db) res.status(500).send("No db connection");

  let db_connect = dbo.getDb("ShippingService");
   const { orderId } = req.body; 
   const newShipment = {
      orderId,
      status: 'CREATED'
     };
  db_connect.collection("shippingInfo").insertOne(newShipment, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

 //update el status

 recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb("ShippingService");
  let myquery = { _id: ObjectId( req.params.id )}; 
  let newvalues = {   
    $set: {     
      name: req.body.name,    
      position: req.body.position,     
      level: req.body.level,   
    }, 
   }
 });


 router.route("/update/:id").patch('/shipments/:orderId', async (req, res) => {
  if (!db) res.status(500).send("No db connection");
 
  const { orderId } = req.params;
  const result = await db.collection('shipments').findOne({ orderId });
 
  // CREATED | SHIPPED | DELIVERED
 
  const updateShipmentStatus = {
    CREATED: 'SHIPPED',
    SHIPPED: 'DELIVERED',
  }[result.status];
 
  const results = await db.collection('shipments').updateOne({ orderId }, { status: updateShipmentStatus });
  return res.status(200).send(results);
});

 router.route("/update/:id").patch('/shipments/:orderId', async (req, res) => {
  if (!dbo) res.status(500).send("No db connection");

  const { orderId } = req.params; 
  const results = await db.collection('shippingInfo').findOne({ orderId });

  // CREATED | SHIPPED | DELIVERED

  const updateShipmentStatus = {
    CREATED: 'SHIPPED',
    SHIPPED: 'DELIVERED',
  }[results.status];
  
  const result = await db.collection('shippingInfo').updateOne({ orderId }, { status: updateShipmentStatus });
  return res.status(200).send(result);
});


exports.router=router;

