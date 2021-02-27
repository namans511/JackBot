const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// defining the schema model for otp storage
const MessageSchema = new Schema({
  chat_id: Number,
  name: String,
  username: String,
  messages: [String],
});

module.exports = mongoose.model("Message", MessageSchema);
