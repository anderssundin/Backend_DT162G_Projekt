const mongoose = require('mongoose');

// Connect to the database with mongoose
//mongoose.connect('mongodb://127.0.0.1:27017/WT');
const dbPassword = process.env.DB_PASSWORD;
// Connect to the database with mongoose
mongoose.connect(`mongodb+srv://anderssundin:${dbPassword}@cluster0.qxf9kh9.mongodb.net/WT?retryWrites=true&w=majority`);



// Handle errors and sucess0 with connection to database 
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB anslutningsfel:'));
db.once('open', () => {
  console.log('Ansluten till MongoDB-databasen');
});

// Export mongoose object

module.exports = mongoose;