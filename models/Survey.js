const mongoose = require("mongoose");
const { Schema } = mongoose;
const Joi = require("joi-browser");
const { userSchema } = require("./user");
const recipientSchema = require("./Recipient");
Joi.objectId = require("joi-objectid")(Joi);

const surveySchema = Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50,
  },
  subject: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  body: {
    type: String,
    required: true,
    minlength: 2,
  },
  recipients: [recipientSchema],
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
  user: {
    type: userSchema,
    required: true,
  },
  dateSent: Date,
  lastResponded: Date,
  // _user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Survey = mongoose.model("surveys", surveySchema);

const validateSurvey = (survey) => {
  const schema = {
    title: Joi.string().min(2).max(50).required(),
    subject: Joi.string().min(2).max(200).required(),
    body: Joi.string().min(2).required(),
    recipients: Joi.string().min(1).required(),
    userId: Joi.objectId().required(),
  };

  return Joi.validate(survey, schema);
};

module.exports = {
  Survey,
  validateSurvey,
};
