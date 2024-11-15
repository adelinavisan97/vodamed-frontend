import React from "react";

const Dashboard = () => {
    return (
        <div className="bg-gray-100 h-screen">
            {/* Hero Section */}
            <div className="relative rounded-lg shadow-md overflow-hidden bg-sky-200">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-right bg-no-repeat opacity-70"
                    style={{
                        backgroundImage: "url('pills.png')",
                        backgroundSize: "contain",
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-10 max-w-lg mx-auto py-40 flex flex-col items-center text-center">
                    <h1 className="text-6xl font-bold text-sky-600 mb-4">
                        Your online pharmacy
                    </h1>
                    <p className="text-gray-700 mb-6 text-base">
                        A summary of your prescriptions and health history
                    </p>
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                        <button className="bg-orange-300 text-white font-semibold py-2 px-4 rounded-lg hover:bg-yellow-600 hover:rounded-full">
                            View prescriptions
                        </button>
                        <button className="bg-sky-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 hover:rounded-full">
                            Order medications
                        </button>
                    </div>
                </div>
            </div>

            {/* Recommended Medications Section */}
            <div className="mt-4 bg-white rounded-lg shadow-md p-8">
                <h2 className="text-3xl font-bold text-orange-500 mb-4">
                    Recommended medications
                </h2>
                <p className="text-gray-700 mb-6">
                    Review medications recommended based on your health history
                </p>
                <div className="flex justify-around">
                    <img
                        src="path-to-your-pill-image.jpg"
                        alt="Pills"
                        className="w-40 rounded-lg"
                    />
                </div>
            </div>

            {/* Recent Prescriptions Section */}
            <div className="mt-10 bg-white rounded-lg shadow-md p-8">
                <h3 className="text-2xl font-bold text-blue-600 mb-4">
                    Recent prescriptions
                </h3>
                <p className="text-gray-700 mb-6">Summary</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gray-50 p-4 rounded shadow text-center">
                        <h4 className="font-semibold text-gray-800">
                            Prescription 1
                        </h4>
                        <p className="text-gray-500">Medication name</p>
                        <p className="text-gray-400 text-sm">10/10/2024</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded shadow text-center">
                        <h4 className="font-semibold text-gray-800">
                            Prescription 2
                        </h4>
                        <p className="text-gray-500">Medication name</p>
                        <p className="text-gray-400 text-sm">05/09/2024</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded shadow text-center">
                        <h4 className="font-semibold text-gray-800">
                            Prescription 3
                        </h4>
                        <p className="text-gray-500">Medication name</p>
                        <p className="text-gray-400 text-sm">01/09/2024</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
