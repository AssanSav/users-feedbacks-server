const express = require("express")
// const morgan = require("morgan")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const keys = require("./config/keys")

require("./models/user")
require("./services/passport")

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

const app = express()

app.use(cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [keys.cookieKey]
}))

app.use(passport.initialize())
app.use(passport.session())

// app.use(morgan("tiny"))
// require("./routes/facebookAuth")(app)
require("./routes/googleAuth")(app)

const PORT = process.env.PORT || 5000
app.listen(PORT)