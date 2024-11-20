import React, { useEffect, useState } from "react";
import axios from "axios";

const Prescriptions = () => {
    const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Retrieve the userId from local storage
    const userId = localStorage.getItem("userId"); // Adjust as necessary based on how you're storing userId

    // Retrieve the cached medicines from localStorage
    const cachedMedicines: MedicineDbModel[] = JSON.parse(
        localStorage.getItem("medicines") || "[]"
    );

    // Helper function to get the medicine name by ID
    const getMedicineNameById = (id: string): string => {
        const medicine = cachedMedicines.find((med) => med._id === id);
        return medicine ? medicine.name : "Unknown Medicine";
    };

    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                // Ensure you have the token available from your authentication process
                const token = localStorage.getItem("authToken"); // Adjust where you get the token from

                const response = await axios.get(
                    `https://sea-turtle-app-9l4ak.ondigitalocean.app/api/users/${userId}/getPrescriptions`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // Send the token in the Authorization header
                        },
                    }
                );

                setPrescriptions(response.data as Prescription[]);
                setLoading(false);
            } catch (error) {
                setError(error.response ? error.response.data : error.message);
                setLoading(false);
            }
        };

        fetchPrescriptions();
    }, [userId]);

    if (loading) {
        return <p>Loading prescriptions...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="bg-white py-24 px-12 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-5xl font-bold text-sky-600 mb-12">
                Your Recent Prescriptions
            </h2>
            {prescriptions.length === 0 ? (
                <p>No prescriptions found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {prescriptions.map((prescription) => (
                        <div
                            key={prescription.id}
                            className="p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                            <h3 className="font-semibold text-gray-800 mb-2">
                                Prescription Date:{" "}
                                {new Date(
                                    prescription.prescriptionDate
                                ).toLocaleDateString()}
                            </h3>
                            <div className="space-y-2">
                                {prescription.medicines.map(
                                    (medicine, index) => (
                                        <div
                                            key={index}
                                            className="p-2 bg-white rounded border border-gray-100"
                                        >
                                            <h4 className="font-medium text-gray-700">
                                                Medicine:{" "}
                                                {getMedicineNameById(
                                                    medicine.medicine
                                                )}
                                            </h4>
                                            <p className="text-sm text-gray-600">
                                                Dosage: {medicine.dosage}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Quantity: {medicine.quantity}
                                            </p>
                                        </div>
                                    )
                                )}
                            </div>
                            {prescription.notes && (
                                <p className="mt-4 text-sm italic text-gray-500">
                                    Notes: {prescription.notes}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Prescriptions;
