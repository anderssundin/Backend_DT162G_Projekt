var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Schemas/users');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  const users = await User.find({});
  res.status(200).json(users);
});



// ADD NEW USER

router.post('/newUser', async function (req, res) {

  // save data to variabel from req to send to db.
  const { name, email, password, startWeight, goalWeight } = req.body;
  try {

    // see if user already exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(400).json({ message: 'Eposten existerar redan i databasen' });
    }
    // Use bcrypt to hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);


    const newUser = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
      startWeight: startWeight,
      goalWeight: goalWeight

    });
    res.status(201).json(newUser)
  } catch (error) {
    console.log('Något gick fel:' + error);
    res.status(500);
  }
});

module.exports = router;
