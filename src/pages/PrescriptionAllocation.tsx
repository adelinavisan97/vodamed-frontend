import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const PrescriptionAllocation = () => {
  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [selectedPharmacy, setSelectedPharmacy] = useState('');
  const [instructions, setInstructions] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailNotification, setEmailNotification] = useState(false);
  const [selectedHealth, setSelectedHealth] = useState('');

  // Sample medication data
  const [medications] = useState([
    {
      id: 1,
      name: 'Name',
      description: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. - Description',
      image: '/api/placeholder/150/150'
    },
    {
      id: 2,
      name: 'Name',
      description: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. - Description',
      image: '/api/placeholder/150/150'
    },
    {
      id: 3,
      name: 'Name',
      description: 'Body text for whatever you\'d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story. - Description',
      image: '/api/placeholder/150/150'
    }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4">
        <h2 className="text-xl font-semibold mb-6">Prescription allocation - Doctors only</h2>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Prescription Details */}
          <div className="md:w-1/2">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold mb-6">Prescription details</h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Patient Name Fields */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm mb-1">Patient full name</label>
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

                {/* Date of Birth */}
                <div>
                  <label className="block text-sm mb-1">Patient date of birth</label>
                  <select 
                    className="w-full border rounded p-2"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                  >
                    <option value="">Value</option>
                  </select>
                </div>

                {/* Patient Record */}
                <div>
                  <select className="w-full border rounded p-2">
                    <option>John Doe, 24/02/1987</option>
                  </select>
                </div>

                {/* Health Radio Buttons */}
                <div className="flex gap-6">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="health"
                      value="health1"
                      checked={selectedHealth === 'health1'}
                      onChange={(e) => setSelectedHealth(e.target.value)}
                      className="mr-2"
                    />
                    Health 1
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="health"
                      value="health2"
                      checked={selectedHealth === 'health2'}
                      onChange={(e) => setSelectedHealth(e.target.value)}
                      className="mr-2"
                    />
                    Health 2
                  </label>
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

                {/* Instructions */}
                <div>
                  <label className="block text-sm mb-1">Instructions</label>
                  <textarea
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    className="w-full border rounded p-2"
                    rows={4}
                    placeholder="Information regarding medication dosage, side effects..."
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm mb-1">Contact phone number</label>
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
              <p className="text-gray-600 mb-6">Your selected products</p>

              <div className="space-y-6">
                {medications.map((medication) => (
                  <div key={medication.id} className="flex gap-4 pb-4 border-b">
                    <img
                      src={medication.image}
                      alt={medication.name}
                      className="w-24 h-24 object-cover rounded bg-blue-100"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{medication.name}</h4>
                      <p className="text-sm text-gray-600">{medication.description}</p>
                    </div>
                    <button className="px-3 py-1 bg-orange-200 rounded-md hover:bg-orange-300 h-fit">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrescriptionAllocation;