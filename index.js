const morgan = require("morgan")
const express = require("express")
const app = express()

app.use(morgan("tiny"))

app.get("/", (req, res) => {
  res.send("Route route")
})

const PORT = process.env.PORT || 5000
app.listen(PORT)