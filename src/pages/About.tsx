// pages/About.tsx
import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="about-container max-w-7xl mx-auto px-4 py-8">
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold">
                        What we <span className="text-blue-400">do</span>
                    </h1>
                </div>

                {/* Main Content Section */}
                <div className="flex flex-col md:flex-row gap-8 items-center border border-blue-200 rounded-lg p-6 bg-white shadow-sm">
                    <div className="md:w-1/2">
                        <img
                            src="healthcare-professional-reviewing-meds.webp"
                            alt="Healthcare professionals reviewing medication"
                            className="rounded-lg w-full h-auto shadow-md"
                        />
                    </div>

                    <div className="md:w-1/2 space-y-6">
                        <div>
                            <p className="text-gray-800 mb-4">
                                Welcome to VodaMed, your trusted online
                                destination for convenient and reliable
                                healthcare. Our portal is designed to make
                                medication management easy and accessible for
                                patients, doctors, and healthcare providers.
                            </p>

                            <p className="text-gray-800 mb-4">
                                For patients, we offer a seamless experience to
                                browse and purchase a wide selection of
                                over-the-counter (OTC) medications. Whether you
                                need everyday essentials, wellness products, or
                                specialised treatments, our carefully curated
                                catalogue provides what you need with just a few
                                clicks. We prioritise quality and safety,
                                partnering only with licensed suppliers to
                                ensure you receive the best care.
                            </p>

                            <p className="text-gray-800 mb-4">
                                Prescription medications are securely available
                                only through our verified healthcare providers.
                                Patients can view prescriptions provided by
                                their doctors directly on the portal, making it
                                easy to stay updated on their treatment plans.
                                Doctors can conveniently prescribe medications
                                and review prescriptions for their patients,
                                creating a smooth and confidential exchange of
                                healthcare information.
                            </p>

                            <p className="text-gray-800">
                                Our commitment is to bridge the gap between
                                patients and healthcare providers, offering a
                                safe, efficient, and compliant platform where
                                healthcare meets technology. Join us and
                                experience healthcare reimagined for today's
                                world.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
