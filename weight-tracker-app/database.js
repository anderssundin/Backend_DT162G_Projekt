require('dotenv').config();
const mongoose = require('mongoose');
// Connect to the database with mongoose
mongoose.connect(process.env.MONGODB_URI);
// Handle errors and sucess with connection to database 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB anslutningsfel:'));
db.once('open', () => {
  console.log('Ansluten till MongoDB-databasen');
});
// Export mongoose object
module.exports = mongoose;