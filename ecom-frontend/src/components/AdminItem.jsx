import React, { useState } from "react";
import { Trash2, Edit, Percent } from "lucide-react";
import { DltProduct } from "../services/api/services";
import OfferAdd from "./OfferAdd";
import ProductUpdateForm from "./ProductUpdateForm";

const AdminItem = ({ product, onDelete, onUpdate }) => {
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const handleDelete = async () => {
    try {
      await DltProduct(product.id);
      alert(`${product.ProductName} has been deleted`);
      window.location.reload();
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  const handleOfferClick = () => {
    setShowOfferModal(true);
  };

  const handleCloseModal = () => {
    setShowOfferModal(false);
  };
  const handleUpdateClick = () => {
    setShowUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
  };

  return (
    <div
      key={product.id}
      className="w-72 border rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition duration-300 flex flex-col bg-white"
    >
      <img
        src={product.Image}
        alt={product.ProductName}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 text-center flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 truncate">
          {product.ProductName}
        </h3>
      </div>

      <div className="flex justify-around items-center px-4 py-3 border-t bg-gray-50">
        <button
          onClick={handleDelete}
          className="flex items-center justify-center cursor-pointer w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full transition transform hover:scale-110 shadow-sm"
        >
          <Trash2 size={22} />
        </button>

        <button
          onClick={handleUpdateClick}
          className="flex items-center cursor-pointer justify-center w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition transform hover:scale-110 shadow-sm"
        >
          <Edit size={22} />
        </button>

        <button
          onClick={handleOfferClick}
          className="flex items-center cursor-pointer justify-center w-12 h-12 bg-green-500 hover:bg-green-600 text-white rounded-full transition transform hover:scale-110 shadow-sm"
        >
          <Percent size={22} />
        </button>
      </div>

      {showOfferModal && (
        <OfferAdd id={product.id} onClose={handleCloseModal} />
      )}
      {showUpdateModal && (
        <ProductUpdateForm id={product.id} onClose={handleCloseUpdateModal} />
      )}
    </div>
  );
};

export default AdminItem;
