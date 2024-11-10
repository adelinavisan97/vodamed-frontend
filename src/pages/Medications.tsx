import React, { useState, useEffect } from 'react';
import './Medications.css';

const Medications = () => {
    // Placeholder for medication data, you can replace this with actual data from the backend
    const [medications, setMedications] = useState([
        { id: 1, name: 'Medication 1', image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Medication 2', image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Medication 3', image: 'https://via.placeholder.com/150' },
        { id: 4, name: 'Medication 4', image: 'https://via.placeholder.com/150' },
        { id: 5, name: 'Medication 5', image: 'https://via.placeholder.com/150' },
        { id: 6, name: 'Medication 6', image: 'https://via.placeholder.com/150' },
    ]);

    return (
        <div className="flex flex-col md:flex-row w-full p-8">
            {/* Sidebar Filters */}
            <aside className="w-64 h-screen bg-gray-100 p-4 sticky top-0">
                <h3 className="AsideTitle">Filters</h3>
                <br></br><p className="AsideSub">Method of Application</p><br></br>
                <div className="flex flex-col space-y-3">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Oral
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Injection
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Topical
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Inhalation
                    </label>
                </div>
                <br></br><p className="AsideSub">Status</p><br></br>
                <div className="flex flex-col space-y-3">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Prescription
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Over the Counter
                    </label>
                </div>
                <br></br><p className="AsideSub">Brand</p><br></br>
                <div className="flex flex-col space-y-3">
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        GSK
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Pfizer
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        Haleon
                    </label>
                    <label className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        AstraZeneca
                    </label>
                </div>
            </aside>

            {/* Medications Grid */}
            <main className="flex-1 p-6 w-full md:w-3/4">
                <h2 className="text-2xl font-semibold mb-6">Medications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {medications.map((medication) => (
                        <div key={medication.id} className="border p-4 flex flex-col items-center">
                            <img
                                src={medication.image}
                                alt={medication.name}
                                className="w-full h-40 object-cover mb-4 "
                            />
                            <h3 className="text-lg font-semibold mb-2 text-center">{medication.name}</h3>
                            <button className="bg-blue-500 text-white py-2 px-4s hover:bg-blue-600 w-1/2">
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Medications;