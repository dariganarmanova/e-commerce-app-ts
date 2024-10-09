const express = require('express')
const app = express()
const cors = require('cors')
const login = require("./routes/auth")
const sign = require("./routes/auth")
const db = require("./db")
const product = require("./routes/product")
const errorHandler = require("./middleware/errorMiddleware.js")
app.use(cors())
app.use(express.json())
app.use(errorHandler)

app.use("/", login)
app.use("/", sign)
app.use("/", product)

app.listen(5005, () => {
    console.log("server is listening on port 5005")
})