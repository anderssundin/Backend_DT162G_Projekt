var express = require('express');
var router = express.Router();
const User = require('../Schemas/users');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await User.find({});
  res.status(200).json(users);
});

router.post('/', async function (req, res) {

  // save data to variabel from req to send to db.
  const {name, email, password} = req.body;
  try {

    // see if user already exists
    const userExists = await User.findOne({email:email});

    if (userExists){
      return res.status(400).json({message: 'Eposten existerar redan i databasen'});
    }
   
    const newUser = await User.create({
      name: name,
      email: email,
      password: password
    });
    res.status(201).json(newUser)
  } catch (error) {
      console.log('Något gick fel:' + error);
  }
});

module.exports = router;
