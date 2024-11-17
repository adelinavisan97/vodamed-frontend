// MedicineDetails.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllMedicines } from "../authentication/auth-service";
import Spinner from "./Spinner";

const MedicineDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    // Retrieve the cached medicines from localStorage
    const cachedMedicines: MedicineDbModel[] = JSON.parse(
        localStorage.getItem("medicines") || "[]"
    );

    // Find the selected medicine by ID
    const medicine = cachedMedicines.find((med) => med._id === id);

    if (!medicine) return <p>Medicine not found.</p>;

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
                        <span className="font-semibold">Dosage:</span>{" "}
                        {medicine.dosage}
                    </p>
                    {medicine.sideEffects &&
                        medicine.sideEffects.length > 0 && (
                            <div className="text-gray-600 mb-4">
                                <p className="font-semibold">Side Effects:</p>
                                <ul className="list-disc list-inside">
                                    {medicine.sideEffects.map(
                                        (effect, index) => (
                                            <li key={index}>{effect}</li>
                                        )
                                    )}
                                </ul>
                            </div>
                        )}
                    <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
                        Add to basket
                    </button>
                    <div className="mt-4">
                        <p className="font-semibold">Description:</p>
                        <p className="text-gray-600">
                            {medicine.description ||
                                "No description available."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MedicineDetails;
