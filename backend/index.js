const express = require('express')
const app = express()
const cors = require('cors')
const login = require("./routes/auth")
const sign = require("./routes/auth")
const db = require("./db")
app.use(cors())
app.use(express.json())

app.use("/", login)
app.use("/", sign)

app.listen(5005, () => {
    console.log("server is listening on port 5005")
})