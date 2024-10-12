import React, { useContext } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { AuthContext } from "../context";

interface Products {
  id: number;
  product_name: string;
  description: string;
  user_id: number;
  price: number;
  imageUrl?: string;
}

const ProductList: React.FC = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Context does not exist! Undefined");
  }
  const { isLoggedIn } = context;
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const handleFetch = async () => {
      const token = localStorage.getItem("token");
      try {
        const result = await axios.get<Products[]>(
          "http://localhost:5005/products",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (result) {
          setProducts(result.data);
          console.log(products);
        } else {
          console.log("Unable to fetch data");
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  });

  return (
    <div>
      {isLoggedIn ? (
        <>
          <p className="textHeader">
            Here are all of the products you created:
          </p>
          <ul className="container">
            {products.map((product) => (
              <li key={product.id}>
                <h1 className="product">
                  Product Name: {product.product_name}
                </h1>
                <h2 className="product">
                  Product Description: {product.description}
                </h2>
                {product.imageUrl ? (
                  <img
                    src={product.imageUrl}
                    alt={product.product_name}
                    className="image"
                  />
                ) : (
                  <p>No image available for this product</p>
                )}
                <h2 className="productPrice">Product Price: {product.price}</h2>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>
          You are not logged in or signed up, so that is why there is no data
          available.
        </p>
      )}
    </div>
  );
};

export default ProductList;
