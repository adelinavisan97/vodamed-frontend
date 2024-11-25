import React from 'react';
import { Link } from 'react-router-dom';

interface Prescription {
  id: string;
  date: string;
  pharmacy: string;
  pharmacist: string;
  items: number;
  type: string;
  status: string;
  prescriptionNumber: string;
}

const PrescriptionReview = () => {
  const prescriptions: Prescription[] = [
    {
      id: '1',
      date: 'Created: 1/3/2023 2:00pm',
      pharmacy: 'Boots Pharmacy',
      pharmacist: 'Jessie L.',
      items: 7,
      type: 'Regular',
      status: 'Processing (2-3 days)',
      prescriptionNumber: 'RX-2023-0123'
    },
    {
      id: '2',
      date: 'Created: 2/3/2023 1:05pm',
      pharmacy: 'Lloyds Pharmacy',
      pharmacist: 'Tim Z.',
      items: 10,
      type: 'Urgent',
      status: 'Out for delivery',
      prescriptionNumber: 'RX-2023-0124'
    },
    {
      id: '3',
      date: 'Created: 1/3/2023 2:00pm',
      pharmacy: 'Boots Pharmacy',
      pharmacist: 'Jessie L.',
      items: 17,
      type: 'Regular',
      status: 'Delivered',
      prescriptionNumber: 'RX-2023-0125'
    },
    {
      id: '4',
      date: 'Created: 2/3/2023 1:05pm',
      pharmacy: 'Well Pharmacy',
      pharmacist: 'Emily W.',
      items: 10,
      type: 'Regular',
      status: 'Processing (2-3 days)',
      prescriptionNumber: 'RX-2023-0126'
    },
    {
      id: '5',
      date: 'Created: 1/3/2023 2:00pm',
      pharmacy: 'Well Pharmacy',
      pharmacist: 'Jessie L.',
      items: 17,
      type: 'Urgent',
      status: 'Out for delivery',
      prescriptionNumber: 'RX-2023-0127'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6 px-4">
        <h2 className="text-xl font-bold mb-6">Your prescriptions</h2>
        
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-blue-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescription Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescription Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pharmacy
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {prescriptions.map((prescription) => (
                <tr key={prescription.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {prescription.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {prescription.prescriptionNumber}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{prescription.pharmacy}</div>
                    <div className="text-sm text-gray-500">{prescription.pharmacist}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {prescription.items} items
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      prescription.type === 'Urgent' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                    }`}>
                      {prescription.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {prescription.status}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">Edit order</a>
                    <a href="#" className="text-blue-600 hover:text-blue-900">Expand</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between items-center">
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Previous
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    1
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-blue-600 hover:bg-gray-50">
                    2
                  </a>
                  <a href="#" className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                    3
                  </a>
                  <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                    Next
                  </a>
                </nav>
              </div>
              <div className="flex items-center">
                <span className="mr-2">View</span>
                <select className="border-gray-300 rounded-md text-sm">
                  <option>50</option>
                  <option>100</option>
                  <option>200</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrescriptionReview;