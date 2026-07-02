const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is mandatory."],
    trim: true
  },
  email: {
    type: String,
    required: [true, "Email verification target is required."],
    trim: true
  },
  message: {
    type: String,
    required: [true, "Message payload content cannot be empty."],
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);