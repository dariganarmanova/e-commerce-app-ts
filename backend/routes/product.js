const express = require('express')
const app = express()
const cors = require('cors')
const pool = require("../db")
const multer = require('multer');
const path = require('path');
const verifyToken = require('../middleware/jwtAuth')

app.use(cors())
app.use(express.json())

//get the products of the seller only with an image
app.get('/products', verifyToken, async (req, res, next) => {
    const { id: userId } = req.user;

    try {
        const productResult = await pool.query(
            "SELECT * FROM products WHERE user_id = $1",
            [userId]
        );
        console.log(userId)
        const products = productResult.rows
        console.log(products)
        const productsWithImages = await Promise.all(products.map(async (product) => {
            const imageResult = await pool.query(
                "SELECT url FROM images WHERE product_id = $1",
                [product.id]
            );
            const imageUrl = imageResult.rows.length ? imageResult.rows[0].url : null;
            return { ...product, imageUrl };
        }));
        console.log(productsWithImages)
        res.json(productsWithImages)
    } catch (err) {
        console.error(err);
        next(err);
    }
});

app.get("/statusGet", verifyToken, async (req, res, next) => {
    const { id: userId } = req.user
    try {
        const result = await pool.query("SELECT status FROM products WHERE user_id=$1", [userId])
        const response = result.rows
        if (response) {
            res.status(201).json(response)
            console.log(response)
        } else {
            res.status(404).json({ message: "resource was not found" })
        }
    } catch (error) {
        res.status(500).json({ message: "internal server error?" })
    }
})

//here get all of the products 
app.get("/productsAll", verifyToken, async (req, res, next) => {
    try {
        const result = await pool.query("SELECT * FROM products")
        const image = await pool.query("SELECT * FROM images")

        const resultProduct = result.rows
        const imageUrl = result.rows
        console.log(resultProduct)
        if (result || image) {
            res.status(201).json({ ...resultProduct, imageUrl })
        } else {
            const err = new Error("Unable to fetch data")
            err.status(404)
            return next(err)
        }
    } catch (err) {
        next(err)
    }
})

//here creating the product
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`);
    }
});
const upload = multer({ storage });

//route to create a product with an image
app.post('/products', verifyToken, upload.single('image'), async (req, res, next) => {
    const { product_name, description, price } = req.body;
    const { id: userId } = req.user;
    const imageFile = req.file;

    try {
        const productResult = await pool.query(
            "INSERT INTO products (product_name, description, user_id, price) VALUES ($1, $2, $3, $4) RETURNING *",
            [product_name, description, userId, price]
        );

        const productId = productResult.rows[0].id;

        if (imageFile) {
            const imageUrl = `http://localhost:5005/uploads/${imageFile.filename}`;
            await pool.query(
                "INSERT INTO images (url, product_id) VALUES ($1, $2)",
                [imageUrl, productId]
            );
        }

        res.status(201).json({ message: 'Product and image successfully created!' });

    } catch (err) {
        console.error(err);
        next(err);
    }
});

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

module.exports = app