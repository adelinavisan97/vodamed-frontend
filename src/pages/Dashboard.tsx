import React from "react";
import Prescriptions from "../components/PrescriptionsComponent";

const Dashboard = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            {/* Hero Section */}
            <div className="relative rounded-lg shadow-md overflow-hidden bg-sky-200">
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-no-repeat opacity-70 rotate-bg-sm"
                    style={{
                        backgroundImage: "url('pills.png')",
                        backgroundSize: "contain",
                    }}
                ></div>

                {/* Content */}
                <div className="relative z-10 max-w-lg mx-auto py-40 flex flex-col items-center text-center">
                    <h1 className="lg:text-7xl sm:text-6xl font-bold text-sky-600 mb-4">
                        Your online pharmacy
                    </h1>
                    <p className="text-gray-700 mb-6 lg:text-3xl sm:text-xl">
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
            <div className="mt-4 p-12 bg-white rounded-lg shadow-md p-8 flex flex-col md:flex-row">
                {/* Text Section */}
                <div className="md:w-1/2 md:pr-4 mb-4">
                    <h2 className="text-5xl font-bold text-orange-500 mb-4">
                        Latest advice from NHS
                    </h2>
                    <p className="text-gray-700 mb-6">
                        Getting vaccinated against the flu is one of the best
                        ways to protect yourself and others from serious illness
                        this winter. The NHS recommends the flu vaccine for
                        individuals who are at higher risk, including older
                        adults, young children, pregnant women, and those with
                        underlying health conditions.
                    </p>
                    <p className="text-gray-700 mb-6">
                        By getting vaccinated, you help reduce the spread of the
                        flu, prevent hospitalizations, and protect those around
                        you who may be more vulnerable. The flu vaccine is safe
                        and has been proven effective in reducing the severity
                        of symptoms and complications associated with the flu.
                    </p>
                    <p text-gray-700 mb-6>
                        For more detailed information about who should get the
                        flu vaccine and why, visit the official government
                        guidance for Winter 2024-2025:{" "}
                        <a
                            href="https://www.gov.uk/government/publications/flu-vaccination-who-should-have-it-this-winter-and-why/the-flu-vaccination-who-should-have-it-and-why-winter-2023-to-2024"
                            target="_blank"
                            rel="noopener noreferrer" // Adds security features
                            className="text-blue-600 hover:text-blue-800 underline cursor-pointer transition-colors duration-200"
                        >
                            Read more about the flu vaccination
                        </a>
                    </p>
                </div>

                {/* Video Section */}
                <div className="md:w-1/2">
                    <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                        {/* YouTube Video */}
                        <iframe
                            className="w-full h-full"
                            src="https://www.youtube.com/embed/HZeSnvADmgw?autoplay=1&mute=1&controls=1&loop=1&playlist=HZeSnvADmgw"
                            title="YouTube video"
                            frameBorder="0"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Recent Prescriptions Section */}
            <div>
                <Prescriptions />
            </div>
        </div>
    );
};

export default Dashboard;
