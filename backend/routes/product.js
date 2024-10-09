const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("../db")

app.use(cors())
app.use(express.json())

app.get("/products", async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM products")
        if (result) {
            res.json(result.rows)
        } else {
            const err = new Error("Unable to fetch")
        }
    } catch (err) {
        next(err)
    }
})

//here get the products of the seller only
app.get("/products/userId", async (req, res, next) => {
    try {
        const { userId } = req.query
        const result = await pool.query("SELECT * FROM products WHERE user_id = $1", [userId])
        if (result) {
            res.json(result.rows)
        } else {
            const err = new Error("Unable to fetch or find")
        }
    } catch (err) {
        next(err)
    }
})

//here creating the product
app.post("/products", async (req, res, next) => {
    try {
        const { product_name, description, price } = req.body
        const { userId } = req.user.userId
        const result = await pool.query("INSERT INTO products (product_name, description, user_id, price) VALUES ($1, $2,$3,$4) RETURNING *", [product_name, description, userId, price])
        if (result) {
            res.status(201).json({ message: "Successfully created!" })
        } else {
            const err = new Error("Unable to create this")
        }
    } catch (err) {
        next(err)
    }
})

module.exports = app