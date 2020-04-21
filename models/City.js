const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const CitySchema = new Schema({
  searchLocation: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});





const City = mongoose.model('City', CitySchema);
module.exports = City;
