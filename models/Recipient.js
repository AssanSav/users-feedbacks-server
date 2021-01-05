const mongoose = require("mongoose");
const { Schema } = mongoose;

const recipientSchema = Schema({
  email: { type: String, required: true },
  responded: {
    type: Boolean,
    required: true,
    minlength: 1,
    default: false,
  },
});

module.exports = recipientSchema;
