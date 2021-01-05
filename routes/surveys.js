const requireLogin = require("../middlewares/requireLogin");
const { User } = require("../models/user");
const { Survey, validateSurvey } = require("../models/Survey");
const requireCredit = require("../middlewares/requireCredit.js");
const Mailer = require("../services/Mailer");
const template = require("../services/emailTemplate/survey");

module.exports = (app) => {
  app.post("/api/surveys", [requireLogin, requireCredit], async (req, res) => {
    console.log(req.body);
    const { error } = validateSurvey(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const { userId, title, subject, body, recipients } = req.body;
    const user = await User.findById(userId);

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => {
        return { email: email.trim() };
      }),
      user: {
        email: user.email,
        userId: user._id,
      },
      dateSent: Date.now(),
    });
    const mailer = new Mailer(survey, template(survey));
    try {
      await mailer.send();
      await survey.save();
      user.credits -= 1;
      await user.save();

      res.send(user);
    } catch (error) {
      res.status(422).send(error);
    }
  });
};
