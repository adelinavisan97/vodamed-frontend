import axios from 'axios';

const API_URL = 'http://localhost:3000';

export interface PrescriptionBackend {
  patient: string;
  doctor: string;
  medicines: {
    medicine: string;
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
  pharmacy: string;
  pharmacist: string;
  items: number;
  type: string;
  status: string;
  prescriptionNumber: string;
}

export const prescriptionService = {
  getUserPrescriptions: async (token: string): Promise<PrescriptionDisplay[]> => {
    try {
      const response = await axios.get<PrescriptionBackend[]>(`${API_URL}/prescriptions/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Transform backend data to display format
      return response.data.map(prescription => ({
        id: prescription.patient, // or some unique ID from backend
        date: new Date(prescription.prescriptionDate).toLocaleString(),
        pharmacy: 'Pharmacy Name', // Need to get this from medicines data
        pharmacist: 'Pharmacist Name', // Need to get this from doctor data
        items: prescription.medicines.length,
        type: prescription.notes?.includes('Urgent') ? 'Urgent' : 'Regular',
        status: 'Processing', // Need to determine status logic
        prescriptionNumber: `RX-${prescription.patient.substring(0, 8)}`
      }));
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      throw error;
    }
  }
};