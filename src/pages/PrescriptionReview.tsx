import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/authentication/authContext";
import { PrescriptionDisplay, prescriptionService } from "../services/prescriptionService";
import Spinner from "../components/Spinner";

const PrescriptionReview = () => {
  const { isAuthenticated, isDoctor } = useAuth();
  const [prescriptions, setPrescriptions] = useState<PrescriptionDisplay[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (isDoctor) {
    return <Navigate to="/prescriptions/allocate" replace />;
  }

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!userId || !token) {
          setError("User ID or token is missing.");
          setLoading(false);
          return;
        }

        const prescriptions = await prescriptionService.getUserPrescriptions(token, userId);
        setPrescriptions(prescriptions);
      } catch (err) {
        console.error("Error fetching prescriptions:", err);
        setError("Failed to fetch prescriptions.");
      } finally {
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4">
        <h2 className="text-xl font-bold mb-6">Your Prescriptions</h2>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Prescription Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Doctor
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Medicines
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Dosage
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Quantity
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Notes
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptions.map((prescription, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {prescription.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {prescription.doctorName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <ul className="list-disc list-inside">
                      {prescription.medicines.map((medicine, idx) => (
                        <li key={idx}>{medicine.name}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <ul className="list-disc list-inside">
                      {prescription.medicines.map((medicine, idx) => (
                        <li key={idx}>{medicine.dosage}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <ul className="list-disc list-inside">
                      {prescription.medicines.map((medicine, idx) => (
                        <li key={idx}>{medicine.quantity}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {prescription.notes || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default PrescriptionReview;
