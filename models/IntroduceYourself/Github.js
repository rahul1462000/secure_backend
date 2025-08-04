const mongoose = require('mongoose');

const GithubSchema = new mongoose.Schema({
  github: { type: String, required: true }
});

module.exports = mongoose.model('Github', GithubSchema);
