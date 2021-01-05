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

const app = express();

app.use(express.json());
app.set("trust proxy", 1);
app.use(
  cors({
    credentials: true,
    origin: keys.baseURL,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey],
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
