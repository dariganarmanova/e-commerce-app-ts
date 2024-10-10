import React, { useState } from "react";
import axios from "axios";
import ProductList from "./ProductList";
import "../index.css";

const ProductUpload: React.FC = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    const token = localStorage.getItem("token");
    event.preventDefault();
    const formData = new FormData();
    formData.append("product_name", productName);
    formData.append("description", description);
    formData.append("price", price);
    if (selectedImage) {
      formData.append("image", selectedImage); // Add the image file
    }

    try {
      const response = await axios.post(
        "http://localhost:5005/products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div>
      <ProductList />
      <div className="input">
        <h1 className="createText">Create your own product here: </h1>
        <form onSubmit={handleSubmit}>
          <input
            className="productNameInput"
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <textarea
            className="productDescriptionInput"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            className="productPriceInput"
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            className="productImageInput"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <button type="submit" className="submit">
            Upload Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpload;
