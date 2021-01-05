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
app.use(
  cors({
    credentials: true,
    origin: origins,
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-Forwarded-Proto",
      "Cookie",
      "Set-Cookie",
    ],
    exposedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "X-Forwarded-Proto",
      "Cookie",
      "Set-Cookie",
    ],
  })
);

app.use(
  cookieSession({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    },
    // cookie: {
    //   // maxAge: 30 * 24 * 60 * 60 * 1000,
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "none",
    // },
    // genid: () => uuidv1(),
    keys: [keys.cookieKey],
    sameSite: "none",
    // proxy: true,
    // // httpOnly: true,
    // // secret: "ASJJDmndsflrfmvcmvcvlclv",
    // resave: true,
    // unset: "destroy",
    // saveUninitialized: false,
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
