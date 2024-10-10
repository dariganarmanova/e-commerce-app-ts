import React from "react";

interface Products {
  id: number;
  product_name: string;
  description: string;
  price: number;
  status: "sold" | "not sold";
}

const AllProductList = () => {
  const [products, setProducts] = useState<Products[]>([]);
  return <div></div>;
};

export default AllProductList;
