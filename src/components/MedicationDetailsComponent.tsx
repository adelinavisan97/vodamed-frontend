import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { addToBasket } from "./BasketFunctions";
import { MedicineDbModel } from "../models/MedicationModels";

const MedicineDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Retrieve the cached medicines from localStorage
  const cachedMedicines: MedicineDbModel[] = JSON.parse(
    localStorage.getItem("medicines") || "[]"
  );

  // Find the selected medicine by ID
  const medicine = cachedMedicines.find((med) => med._id === id);

  const [quantity, setQuantity] = useState<number>(1);
  const [isDoctor, setIsDoctor] = useState<boolean>(false);

  useEffect(() => {
    const isDoctorValue = localStorage.getItem("isDoctor") === "true";
    setIsDoctor(isDoctorValue);
  }, []);

  if (!medicine) return <p>Medicine not found.</p>;

  const handleAddToBasket = () => {
    if (medicine._id) {
      addToBasket(medicine._id, quantity);
      window.dispatchEvent(new Event("storage"));
    }
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md m-10 mb-24">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={medicine.image || "default-image.jpg"}
            alt={medicine.name}
            className="md:w-2/3 rounded-lg"
          />
        </div>

        {/* Details Section */}
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{medicine.name}</h1>
          <p className="text-green-500 font-semibold mb-2">
            {medicine.type === "prescription"
              ? "Prescription"
              : "Over the counter"}
          </p>
          <p className="text-3xl font-bold text-gray-800 mb-4">
            £{medicine.price}
          </p>
          <p className="text-gray-600 mb-2">
            <span className="font-semibold">Dosage:</span> {medicine.dosage}
          </p>
          {medicine.sideEffects && medicine.sideEffects.length > 0 && (
            <div className="text-gray-600 mb-4">
              <p className="font-semibold">Side Effects:</p>
              <ul className="list-disc list-inside">
                {medicine.sideEffects.map((effect, index) => (
                  <li key={index}>{effect}</li>
                ))}
              </ul>
            </div>
          )}
          {/* Quantity Selector */}
          <div className="flex items-center mt-4">
            <label htmlFor="quantity" className="mr-2">
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              min="1"
              max={medicine.stock}
              value={quantity}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                if (!isNaN(value) && value >= 1 && value <= medicine.stock) {
                  setQuantity(value);
                }
              }}
              className="border rounded p-1 w-16 text-center"
            />
          </div>
          {/* Add to Basket Button */}
          {(isDoctor || medicine.type !== "prescription") && (
            <button
              onClick={handleAddToBasket}
              className={`py-2 px-4 rounded-lg md:w-1/5 mt-2 ${
                medicine.stock > 0
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-300 text-gray-700 cursor-not-allowed"
              }`}
              disabled={medicine.stock === 0}
            >
              {medicine.stock > 0 ? "Add to basket" : "Out of Stock"}
            </button>
          )}

          <div className="mt-4">
            <p className="font-semibold">Description:</p>
            <p className="text-gray-600">
              {medicine.description || "No description available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineDetails;
