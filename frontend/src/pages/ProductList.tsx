import React from "react";
import { useState, useEffect } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import axios from "axios";

interface Products {
  id: number;
  product_name: string;
  description: string;
  user_id: number;
  price: number;
}

interface CustomerId extends JwtPayload {
  userId: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);

  function getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (!token) {
      return null;
    }
    const decoded = jwtDecode<CustomerId>(token);
    console.log(decoded);
    return decoded.userId;
  }

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const userId = getUserIdFromToken();
        const result = await axios.get<Products[]>(
          `http://localhost:5005/products`,
          {
            params: { userId },
          }
        );
        if (result) {
          setProducts(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleFetch();
  }, []);

  return (
    <div>
      <p>Here are all of the products you created</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.product_name}
            {product.description} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
