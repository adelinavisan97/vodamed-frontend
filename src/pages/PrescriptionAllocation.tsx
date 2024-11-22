import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { MedicineDbModel } from '../models/MedicationModels';

const API_URL = 'http://localhost:443/api';

interface Patient {
  id: string;
  email: string;
}

const PrescriptionAllocation = () => {
  //State for patient details
  const [patients, setPatients] = useState<Patient[]>([]);
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  //const [emailAddress, setEmailAddress] = useState('')
  const [patientId, setPatientId] = useState('');
  //State for all medications
  const [medicines, setMedicines] = useState<MedicineDbModel[]>([]);
  //State for selected medications
  const [selectedMedications, setSelectedMedications] = useState<string[]>([]);
  const [prescriptionDate, setPrescriptionDate] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [notes, setNotes] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailNotification, setEmailNotification] = useState(false);
  //const [selectedHealth, setSelectedHealth] = useState('');

  // Sample medication data
  // const [medications] = useState([
  //   {
  //     id: 1,
  //     name: 'Name',
  //     description: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. - Description',
  //     image: '/api/placeholder/150/150'
  //   },
  //   {
  //     id: 2,
  //     name: 'Name',
  //     description: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. - Description',
  //     image: '/api/placeholder/150/150'
  //   },
  //   {
  //     id: 3,
  //     name: 'Name',
  //     description: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. - Description',
  //     image: '/api/placeholder/150/150'
  //   }
  // ]);

  useEffect(() => {
    //On opening the page will need to call get all patient
    const fetchPatients = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const userDetails = await axios.get(
          `${API_URL}/users/getAllPatientInfo`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPatients(userDetails.data);

        return userDetails.data;
      } catch (error) {
        console.error('Error loading user details for drop down: ', error);
        alert(
          'An error occured while loading details in the page. Please try again later'
        );
      }
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const cachedMedicines = JSON.parse(
      localStorage.getItem('medicines') || '[]'
    );
    console.log(cachedMedicines);
    setMedicines(cachedMedicines);
  }, []);

  const handleMedicationsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValues = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    // Update state to add newly selected values without replacing the array
    setSelectedMedications((prevState) => {
      // Merge the existing selections with the newly selected ones
      return Array.from(new Set([...prevState, ...selectedValues])); // Remove duplicates
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission

    const prescription = {
      patient: patientId,
      doctor: localStorage.getItem('userId'),
      medicines: [], //Not sure how to get this
      prescriptionDate: prescriptionDate,
      notes: notes,
      emailNotification,
    };
    console.log(prescription);
    const token = localStorage.getItem('authToken');
    try {
      const response = await axios.post('', prescription, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Form submitted successfully');
      alert('Prescription allocated successfully!');
    } catch (error) {
      console.error('Error submitting form: ', error);
      alert(
        'An error occured while allocating the prescription. Please try again later'
      );
    }
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4">
        <h2 className="text-xl font-semibold mb-6">
          Prescription allocation - Doctors only
        </h2>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Prescription Details */}
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-6">
                Prescription details
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Patient Name Fields */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm mb-1">
                      Patient full name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      placeholder="John"
                      className="w-full border rounded p-2"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="block text-sm mb-1">&nbsp;</label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      placeholder="Doe"
                      className="w-full border rounded p-2"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-sm mb-1">
                    Patient email address
                  </label>
                  <select
                    className="w-full border rounded p-2"
                    value={patientId}
                    onChange={(e) => setPatientId(e.target.value)}
                    required
                  >
                    <option value="">Select an email address</option>
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.email}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Medication Selection */}
                <div>
                  <label className="block text-sm mb-1">
                    {' '}
                    Select Medications
                  </label>
                  <select
                    className="w-full border rounded p-2"
                    multiple
                    value={selectedMedications}
                    onChange={handleMedicationsChange}
                  >
                    {medicines.map((medication) => (
                      <option key={medication._id} value={medication._id}>
                        {medication.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Prescription Date */}
                <div>
                  <label className="block text-sm mb-1">
                    Perscription End Date
                  </label>
                  <input
                    type="date" // Use 'date' type for date picker
                    value={prescriptionDate}
                    onChange={(e) => setPrescriptionDate(e.target.value)}
                    className="w-full border rounded p-2"
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>

                {/* Pharmacy Selection */}
                <div>
                  <label className="block text-sm mb-1">Select pharmacy</label>
                  <select
                    className="w-full border rounded p-2"
                    value={selectedPharmacy}
                    onChange={(e) => setSelectedPharmacy(e.target.value)}
                  >
                    <option>Boots, 1 Lance Road, GU12 5GH</option>
                  </select>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm mb-1">Notes</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full border rounded p-2"
                    rows={4}
                    placeholder="Information regarding medication dosage, side effects..."
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm mb-1">
                    Contact phone number
                  </label>
                  <div className="flex">
                    <select className="border rounded-l px-2 py-2 bg-white">
                      <option>+44</option>
                    </select>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="flex-1 border-l-0 border rounded-r p-2"
                      placeholder="Phone number"
                    />
                  </div>
                </div>

                {/* Email Notification */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="emailNotification"
                    checked={emailNotification}
                    onChange={(e) => setEmailNotification(e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="emailNotification">
                    Send email notification to patient
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Summary</h3>
              <p className="text-gray-600 mb-6">Your selected medications</p>

              <div className="space-y-6">
                {selectedMedications.map((medicationId) => {
                  const medication = medicines.find(
                    (med) => med._id === medicationId
                  );
                  if (!medication) return null; // Skip if medication not found
                  return (
                    <div
                      key={medication._id}
                      className="flex gap-4 pb-4 border-b"
                    >
                      <img
                        src={medication.image || '/placeholder.jpg'} // Default image if missing
                        alt={medication.name}
                        className="w-24 h-24 object-cover rounded bg-blue-100"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold">{medication.name}</h4>
                        <p className="text-sm text-gray-600">
                          {medication.description}
                        </p>
                      </div>
                      <button
                        className="px-3 py-1 bg-orange-200 rounded-md hover:bg-orange-300 h-fit"
                        onClick={() =>
                          setSelectedMedications((prev) =>
                            prev.filter((id) => id !== medication._id)
                          )
                        }
                      >
                        Remove
                      </button>
                    </div>
                  );
                })}
              </div>

              {selectedMedications.length === 0 && (
                <p className="text-gray-500 text-center">
                  No medications selected.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Your health</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/health-history"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Health history
                </Link>
              </li>
              <li>
                <Link
                  to="/prescriptions"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Current prescriptions
                </Link>
              </li>
              <li>
                <Link
                  to="/symptoms"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Check your symptoms
                </Link>
              </li>
              <li>
                <Link
                  to="/vaccinations"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Book vaccinations
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">External resources</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://digital.nhs.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-blue-500"
                >
                  NHS Digital
                </a>
              </li>
              <li>
                <Link
                  to="/find-gp"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Find my GP
                </Link>
              </li>
              <li>
                <Link
                  to="/find-pharmacy"
                  className="text-gray-600 hover:text-blue-500"
                >
                  Find my pharmacy
                </Link>
              </li>
              <li>
                <Link
                  to="/medplan"
                  className="text-gray-600 hover:text-blue-500"
                >
                  MedPlan
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Contact us</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="tel:02005542453"
                  className="text-gray-600 hover:text-blue-500"
                >
                  02005542453
                </a>
              </li>
              <li>
                <a
                  href="mailto:vodamed@contact.com"
                  className="text-gray-600 hover:text-blue-500"
                >
                  vodamed@contact.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrescriptionAllocation;
