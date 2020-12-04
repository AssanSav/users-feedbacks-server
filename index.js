const express = require("express")
const mongoose = require("mongoose")
const keys = require("./config/keys")
const app = express()


mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })

require("./routes/googleAuth")(app)
require("./services/passport")

const PORT = process.env.PORT || 5000
app.listen(PORT)