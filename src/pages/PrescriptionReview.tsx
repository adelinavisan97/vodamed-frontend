import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from "../components/authentication/authContext";
import axios from 'axios';

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

const API_URL = 'https://sea-turtle-app-9l4ak.ondigitalocean.app/api';

const PrescriptionReview = () => {
 const { isAuthenticated, isDoctor } = useAuth();
 const [prescriptions, setPrescriptions] = useState<Prescription[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<string | null>(null);

 if (isDoctor) {
   return <Navigate to="/prescriptions/allocate" replace />;
 }

 useEffect(() => {
   const fetchPrescriptions = async () => {
     const token = localStorage.getItem('authToken');
     const userId = localStorage.getItem('userId');
     console.log('Token:', token);
     console.log('userId:', userId);

     try {
      const response = await axios.get(`${API_URL}/prescriptions/getPrescriptionsForId/${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
       console.log('API Response:', response.data);

       const transformedData = response.data.map((item: any) => ({
         id: item._id || item.id,
         date: `Created: ${new Date(item.prescriptionDate).toLocaleString()}`,
         pharmacy: "Pending Assignment",
         pharmacist: "Not Assigned", 
         items: item.medicines?.length || 0,
         type: item.type || "Regular",
         status: item.status || "Processing",
         prescriptionNumber: `RX-${new Date(item.createdAt).getFullYear()}-${item._id.slice(-4)}`
       }));

       setPrescriptions(transformedData);
     } catch (err) {
       console.error('Error fetching prescriptions:', err);
       if (axios.isAxiosError(err)) {
         console.log('Error details:', {
           status: err.response?.status,
           data: err.response?.data,
           headers: err.response?.headers
         });
       }
       setError('Failed to fetch prescriptions');
       setPrescriptions([
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
       ]);
     } finally {
       setLoading(false);
     }
   };

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

       <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
         <div>
           <h3 className="font-bold text-lg mb-4">Your health</h3>
           <ul className="space-y-2">
             <li><Link to="/health-history" className="text-gray-600 hover:text-blue-500">Health history</Link></li>
             <li><Link to="/prescriptions" className="text-gray-600 hover:text-blue-500">Current prescriptions</Link></li>
             <li><Link to="/symptoms" className="text-gray-600 hover:text-blue-500">Check your symptoms</Link></li>
             <li><Link to="/vaccinations" className="text-gray-600 hover:text-blue-500">Book vaccinations</Link></li>
           </ul>
         </div>

         <div>
           <h3 className="font-bold text-lg mb-4">External resources</h3>
           <ul className="space-y-2">
             <li><a href="https://digital.nhs.uk" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-500">NHS Digital</a></li>
             <li><Link to="/find-gp" className="text-gray-600 hover:text-blue-500">Find my GP</Link></li>
             <li><Link to="/find-pharmacy" className="text-gray-600 hover:text-blue-500">Find my pharmacy</Link></li>
             <li><Link to="/medplan" className="text-gray-600 hover:text-blue-500">MedPlan</Link></li>
           </ul>
         </div>

         <div>
           <h3 className="font-bold text-lg mb-4">Contact us</h3>
           <ul className="space-y-2">
             <li><a href="tel:02005542453" className="text-gray-600 hover:text-blue-500">02005542453</a></li>
             <li><a href="mailto:vodamed@contact.com" className="text-gray-600 hover:text-blue-500">vodamed@contact.com</a></li>
           </ul>
         </div>
       </div>
     </main>
   </div>
 );
};

export default PrescriptionReview;