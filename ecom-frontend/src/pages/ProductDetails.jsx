import React from "react";
import { useParams } from "react-router-dom";
import FindItem from "../services/FindItem";

const ProductDetails = () => {
  const { id } = useParams();

  const item = FindItem(id);

  if (!item) {
    return <p>Product Not Available</p>;
  }

  return (
    <div>
      <p>{item.name}</p>
      <p>{item.desc}</p>
    </div>
  );
};

export default ProductDetails;
