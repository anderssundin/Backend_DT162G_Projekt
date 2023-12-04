var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Schemas/users');
/* GET users listing. */
router.get('/', async function (req, res, next) {
  
  res.status(200).json({message: "Ditt apianrop fungerar!"});
});



//--------------------
// ADD NEW USER
//--------------------

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



//--------------------
// USER LOGIN
//--------------------
router.post('/login', async function (req, res) {

  // Get email and password
  const { email, password } = req.body;

  // See if email exists in database
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(404).json({ message: 'Eposten finns inte i databasen' });
  }

  // See if password matches
  const validateUser = await bcrypt.compare(password, user.password);

  if (validateUser) {
    return res.status(200).json({
      id: user._id,
      email: user.email,
      name: user.name,
      startWeight: user.startWeight,
      goalWeight: user.goalWeight,
      createdAt: user.createdAt

    });
  } else {
    // If password is wrong
    return res.status(401).json({ message: 'Felaktigt lösenord' });
  }
});


//--------------------
// UPDATE WEIGHTS
//--------------------

router.put('/update', async function (req, res) {

  // store variables
  const { userEmail, startWeight, goalWeight } = req.body;

  try {
    const updatedUser = await User.findOneAndUpdate(
      { email: userEmail },
      { $set: { startWeight: startWeight, goalWeight: goalWeight } },
      //return document
      { new: true } 
    );
      // if wrong email
    if (!updatedUser) {
     
      return res.status(404).json({ message: 'Användaren hittades inte' });
    }
    res.status(200).json({message: "Lyckad uppdatering"});
  }
  catch (error) {
    res.status(500).json({ message: "Fel vid ändring av användarens vikt och viktmål" });
  }
});

module.exports = router;
