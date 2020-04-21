const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/ticketsearch', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to the database...');
});

mongoose.connection.on("error", () => {
  console.log("Failed to connect to the database");
});