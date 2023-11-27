var express = require('express');
var router = express.Router();

//import schema
const Measurement = require('../Schemas/measurement');
/* DATA FOR LOGGING */

//--------------------
// NEW MEASUREMENT
//--------------------
router.post('/', async function (req, res, next) {
  const { userEmail, weight, timestamp } = req.body;
  
  try{
  const measurement = await Measurement.create({
    weight: weight,
    userEmail: userEmail,
    timestamp: timestamp
  });

  res.status(201).json(measurement);
}
catch (error) {
console.log(error);
return res.status(500).json({message: "Lagring misslyckades"});
}
});


//--------------------
// GET LAST SEVEN (7)
//--------------------

router.post('/userSeven', async function (req, res) {
  // Get seven posts by email, sort by date
  const { userEmail } = req.body;
try{
  const measurements = await Measurement.find({userEmail: userEmail}).sort({timestamp: -1}).limit(7);
  res.status(200).json(measurements);
}
catch (error) {
  console.log(error);
  return res.status(500).json({message: "Hämtning misslyckades"});
}
});

//-------------------------
// GET LATEST MEASUREMENT
//-------------------------

router.post('/userLast', async function (req, res) {
  const {userEmail} = req.body;

  try{
    const measurement = await Measurement.find({userEmail: userEmail}).sort({timestamp: -1}).limit(1);
    res.status(200).json(measurement);
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({message: "Hämtning misslyckades"});
    }
});


//--------------------
// FETCH ALL (EMAIL)
//--------------------
router.post('/userall', async function (req, res) {
 const { userEmail } = req.body;

 try  {
  const all = await Measurement.find({userEmail: userEmail}).sort({timestamp: -1});
  res.status(200).json(all);

 }
 catch (error) {
  console.log(error);
  return res.status(500).json({message: "Hämtning misslyckades"});

 }
});

//--------------------
// UPDATE MEASUREMENT
//--------------------

router.put('/update', async function (req, res) {
  const { id, weight } = req.body;

  try {
  const updatedData = await Measurement.updateOne({_id: id}, {$set: {weight: weight}});
  res.status(200).json({message: "Värden uppdaterade"});
}
catch (error) {
  console.log(error);
  res.status(500).json({message: "Något gick fel vid uppdatering av mätvärden"});
}

});

//--------------------
// DELETE MEASUREMENT
//--------------------

router.delete('/delete', async function (req, res) {
  const id = req.body.id;

  try {
  const deleteData = await Measurement.deleteOne({_id: id});
  res.status(200).json({message: "Värden raderade"});
}
catch (error) {
  console.log(error);
  res.status(500).json({message: "Något gick fel vid radering av mätvärden"});
}

});

module.exports = router;
