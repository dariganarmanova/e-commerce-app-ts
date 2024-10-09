const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())

const JWT_SECRET = 'nvdsvnjekna'

app.post('/sign', async (req, res) => {
    try {
        const { email, name, password, role } = req.body
        const newPassword = await bcrypt.hash(password, 10)
        const result = await pool.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, newPassword, role])
        const userId = result.rows[0].id
        const token = jwt.sign({ id: userId, name: result.rows[0].name, email: result.rows[0].email }, JWT_SECRET)
        console.log(token)
        if (result) {
            res.status(201).json({ message: "your login was successful", id: userId, token: token })
        } else {
            console.log("unexpected error")
        }
    } catch (error) {
        console.log(error)
    }
})

app.post('/log', async (req, res) => {
    try {
        const { email, password } = req.body
        const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        if (!result) {
            res.status(404).json({ message: "User was not found" })
        }
        const user = result.rows[0]
        console.log(user.newPassword)
        const decrypt = await bcrypt.compare(password, user.newPassword)
        const token = jwt.sign({ id: user.id }, JWT_SECRET)
        if (decrypt) {
            res.status(201).json({ message: "login was successful", id: user.id, token: token })
        } else {
            res.status(401).json({ message: "the passwords do not match" })
        }
    } catch (error) {
        console.log(error)
    }

})

module.exports = app