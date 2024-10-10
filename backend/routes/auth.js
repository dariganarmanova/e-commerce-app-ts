const express = require('express')
const app = express()
const cors = require('cors')
const pool = require('../db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const verifyToken = require('../middleware/jwtAuth')

app.use(cors())
app.use(express.json())

const JWT_SECRET = 'nvdsvnjekna'

app.post('/sign', async (req, res) => {
    try {
        const { email, name, password, role } = req.body
        if (!email || !name || !password || !role) {
            return res.status(400).json({ message: "All the fields are required" })
        }
        try {
            const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])
        } catch (error) {
            console.log(error)
        }
        const newPassword = await bcrypt.hash(password, 10)
        console.log(newPassword)
        const result = await pool.query("INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *", [name, email, newPassword, role])
        console.log(result)
        const userId = result.rows[0].id
        const token = jwt.sign({ id: userId, name: result.rows[0].name, email: result.rows[0].email }, JWT_SECRET)
        console.log(token)
        if (result) {
            res.status(201).json({ message: "your signin was successful", id: userId, token: token })
        } else {
            return res.status(401).json({ message: 'trouble with saving' })
        }
    } catch (error) {
        res.status(500).json({ message: error })
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
        res.status(500).json({ message: "trouble saving your data, server error" })
    }

})

app.get('/user', verifyToken, async (req, res) => {
    try {
        const { id: userId } = req.user
        const result = await pool.query("SELECT * FROM users WHERE id=$1", [userId])
        if (result) {
            res.status(201).json(result.data)
        } else {
            const err = new Error("Unable to find this user")
            err.status(404)
            return next(err)
        }
    } catch (error) {
        next(err)
    }
})

module.exports = app