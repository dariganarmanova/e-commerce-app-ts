import React, { useState } from "react";
//import "../assets/${product_name.jpg}";
import axios from "axios";
import { jwtDecode, JwtPayload } from "jwt-decode";
import ProductList from "./ProductList";

interface Products {
  id: number;
  product_name: string;
  description: string;
  price: number;
}

//in this component we are just going to create a separate field to post some products

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Products>({
    id: 0,
    description: "",
    price: 0,
    product_name: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProducts((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  //this is the post request for creating the product

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    try {
      const newProduct = { ...products };
      const result = await axios.post(
        "http://localhost:5005/products",
        newProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(result.data);
      if (result) {
        alert("Your product was sucessfully created!");
      } else {
        alert("Having trouble creating");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ProductList />
      <form onSubmit={handleCreate}>
        <input
          name="product_name"
          type="text"
          value={products.product_name}
          onChange={handleInputChange}
        />
        <input
          name="description"
          type="text"
          value={products.description}
          onChange={handleInputChange}
        />
        <input
          name="price"
          type="text"
          value={products.price}
          onChange={handleInputChange}
        />
        <button>Create a product</button>
      </form>
    </div>
  );
};

export default ProductPage;
