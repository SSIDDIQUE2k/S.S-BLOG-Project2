const mongoose = require('mongoose');

const blogSchema = mongoose.Schema ({
  title: String,
  notes: String,
});
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  blogs: [blogSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
