import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../components/authentication/authContext";
import apiClient from "../authentication/apiClient";

interface Medicine {
  medicine: string; // Medicine ID
  dosage: string;   // Dosage information
  quantity: number; // Quantity prescribed
}

interface Prescription {
  doctor: string;            // Doctor ID
  medicines: Medicine[];     // List of medicines
  prescriptionDate: string;  // Prescription date
  notes?: string;            // Optional notes
}

const PrescriptionReview = () => {
  const { isAuthenticated, isDoctor } = useAuth();
  const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [medicines, setMedicines] = useState<Record<string, string>>({}); // Medicine ID -> Name
  const [doctorNames, setDoctorNames] = useState<Record<string, string>>({}); // Doctor ID -> Name

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  if (isDoctor) {
    return <Navigate to="/prescriptions/allocate" replace />;
  }

  useEffect(() => {
    const fetchMedicines = () => {
      try {
        const cachedMedicines = JSON.parse(localStorage.getItem("medicines") || "[]");
        const medicineMap: Record<string, string> = {};
        cachedMedicines.forEach((med: { _id: string; name: string }) => {
          medicineMap[med._id] = med.name;
        });
        setMedicines(medicineMap);
      } catch (err) {
        console.error("Error loading medicines from localStorage:", err);
      }
    };

    const fetchDoctorNames = async (doctorIds: string[]) => {
      const uniqueIds = [...new Set(doctorIds)];
      const names: Record<string, string> = {};

      for (const id of uniqueIds) {
        if (!id) continue; // Skip empty IDs
        try {
          const response = await apiClient.get(`/users/info/${id}`);
          const doctorName = `${response.data.givenName} ${response.data.familyName}`;
          names[id] = doctorName;
        } catch (err) {
          console.error(`Error fetching doctor name for ID ${id}:`, err);
          names[id] = "Unknown";
        }
      }

      setDoctorNames(names);
    };

    const fetchPrescriptions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const userId = localStorage.getItem("userId");

        if (!userId) {
          setError("User ID is missing from localStorage.");
          setLoading(false);
          return;
        }

        const response = await apiClient.get(`/users/${userId}/getPrescriptions`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPrescriptions(response.data);

        // Extract unique doctor IDs and fetch their names
        const doctorIds = response.data.map((prescription: Prescription) => prescription.doctor);
        await fetchDoctorNames(doctorIds);
      } catch (err) {
        console.error("Error fetching prescriptions:", err);
        setError("Failed to fetch prescriptions");
      } finally {
        setLoading(false);
      }
    };

    fetchMedicines();
    fetchPrescriptions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-xl">Loading prescriptions...</div>
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
                    {new Date(prescription.prescriptionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {doctorNames[prescription.doctor] || "Fetching..."}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <ul className="list-disc list-inside">
                      {prescription.medicines.map((medicine, idx) => (
                        <li key={idx}>{medicines[medicine.medicine] || "Unknown"}</li>
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
