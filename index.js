const express = require("express")
const morgan = require("morgan")
const mongoose = require("mongoose")
const keys = require("./config/keys")
const app = express()


mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })


app.use(morgan("tiny"))
require("./models/User")
require("./routes/googleAuth")(app)
require("./services/passport")

const PORT = process.env.PORT || 5000
app.listen(PORT)