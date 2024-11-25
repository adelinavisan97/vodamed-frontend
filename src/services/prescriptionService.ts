import axios from 'axios';
import { API_URL } from '../authentication/apiClient';

export interface PrescriptionBackend {
  patient: string; // User ID of the patient
  doctor: string;  // User ID of the doctor
  medicines: {
    medicine: string; // Medicine ID
    dosage: string;
    quantity: number;
  }[];
  prescriptionDate: Date;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PrescriptionDisplay {
  id: string;
  date: string;
  doctorName: string;
  medicines: {
    name: string;
    dosage: string;
    quantity: number;
  }[];
  notes?: string;
}

export const prescriptionService = {
  getUserPrescriptions: async (token: string, userId: string): Promise<PrescriptionDisplay[]> => {
    try {
      const response = await axios.get<PrescriptionBackend[]>(
        `${API_URL}/users/${userId}/getPrescriptions`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const prescriptions = response.data;

      // Fetch doctor names and medicine names
      const doctorIds = [...new Set(prescriptions.map((prescription) => prescription.doctor))];
      const medicineIds = [
        ...new Set(
          prescriptions.flatMap((prescription) =>
            prescription.medicines.map((med) => med.medicine)
          )
        ),
      ];

      const doctorNames = await Promise.all(
        doctorIds.map(async (id) => {
          try {
            const res = await axios.get(`${API_URL}/users/info/${id}`, {
              headers: { Authorization: `Bearer ${token}` },
            });
            return { id, name: `${res.data.givenName} ${res.data.familyName}` };
          } catch {
            return { id, name: 'Unknown' };
          }
        })
      );

      const medicineNames = JSON.parse(localStorage.getItem('medicines') || '[]').reduce(
        (map: Record<string, string>, med: { _id: string; name: string }) => {
          map[med._id] = med.name;
          return map;
        },
        {}
      );

      // Map the prescriptions to the display format
      return prescriptions.map((prescription) => ({
        id: prescription.patient, // Assuming the patient ID as unique identifier
        date: new Date(prescription.prescriptionDate).toLocaleDateString(),
        doctorName:
          doctorNames.find((doc) => doc.id === prescription.doctor)?.name || 'Fetching...',
        medicines: prescription.medicines.map((med) => ({
          name: medicineNames[med.medicine] || 'Unknown',
          dosage: med.dosage,
          quantity: med.quantity,
        })),
        notes: prescription.notes || 'N/A',
      })) as PrescriptionDisplay[];
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      throw error;
    }
  },
};
