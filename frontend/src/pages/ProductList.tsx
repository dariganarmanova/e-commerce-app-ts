import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

interface Products {
  id: number;
  product_name: string;
  description: string;
  user_id: number;
  price: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Products[]>([]);

  useEffect(() => {
    const handleFetch = async () => {
      const token = localStorage.getItem("token");
      try {
        const result = await axios.get<Products[]>(
          `http://localhost:5005/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
  });

  return (
    <div>
      <p>Here are all of the products you created</p>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.product_name} - {product.description} - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
