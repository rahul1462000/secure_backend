const mongoose = require('mongoose');

const HobbiesSchema = new mongoose.Schema({
  hobbies: { type: String, required: true }
});

module.exports = mongoose.model('Hobbies', HobbiesSchema);
