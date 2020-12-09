const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = Schema({
  googleId: String,
  // facebookId: String,
  email: String,
})

mongoose.model("users", userSchema)