var express = require('express');
var router = express.Router();

//import schema
const Measurement = require('../Schemas/measurement');
/* DATA FOR LOGGING */

//adding new measruement
router.post('/', async function (req, res, next) {
  const { userEmail, weight } = req.body;
  
  try{
  const measurement = await Measurement.create({
    weight: weight,
    userEmail: userEmail
  });

  res.status(201).json(measurement);
}
catch (error) {
console.log(error);
return res.status(500).json({message: "Lagring misslyckades"});
}
});


//FETCHING LAST 7 MEASUREMENTS FROM USER BY EMAIL

router.post('/userSeven', async function (req, res) {
  // Get seven posts by email, sort by date
  const { userEmail } = req.body;
try{
  const measurements = await Measurement.find({userEmail}).sort({timestamp: -1}).limit(7);
  res.status(200).json(measurements);
}
catch (error) {
  console.log(error);
  return res.status(500).json({message: "Hämtning misslyckades"});
}
});

module.exports = router;
