const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/user");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const origins = [
  "http://localhost:3000",
  "http://localhost:5000",
  "https://users-feedback-app.herokuapp.com",
  "http://users-feedback-app.herokuapp.com",
];

const app = express();

app.use(express.json());
app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: origins }));

app.use(
  cookieSession({
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000,
    },
    keys: [keys.cookieKey],
    proxy: true,
    httpOnly: true,
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// require("./routes/facebookAuth")(app)
require("./routes/googleAuth")(app);
require("./routes/billings")(app);
require("./routes/surveys")(app);

const port = process.env.PORT || 5000;
app.listen(port);
