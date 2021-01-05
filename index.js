const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
var cookieParser = require("cookie-parser");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/user");
require("./models/Survey");
require("./services/passport");

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const app = express();

app.all('*', function(req, res, next) {

  res.setHeader("Access-Control-Allow-Origin", keys.baseURL);
  res.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use(express.json());
app.set("trust proxy", 1);
app.use(cors({ credentials: true, origin: keys.baseURL }));
app.use(cookieParser());

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
    resave: false,
    saveUninitialized: true,
    cookie: {
        path: "/",
        secure: true,
        domain: keys.baseURL,
        httpOnly: true
    }
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
