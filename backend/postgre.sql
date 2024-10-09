CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    product_name VARCHAR(100),
    description TEXT,
    user_id INT REFERENCES users(id),
    price DECIMAL(10,2)
);