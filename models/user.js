const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
  googleId: String,
  // facebookId: String,
  email: String,
  credits: {
    type: Number,
    default: 0,
  },
});

mongoose.model("users", userSchema);
