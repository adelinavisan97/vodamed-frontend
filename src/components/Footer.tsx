import React from "react";

const Footer = () => {
    return (
        <footer className="bg-white border-t border-gray-300 py-8">
            <div className="container mx-auto px-4 md:px-8">
                {/* Top Section: Social Icons */}
                <div className="flex justify-center space-x-6 mb-6">
                    <a
                        href="#"
                        aria-label="Facebook"
                        className="text-gray-500 hover:text-blue-600"
                    >
                        <i className="fab fa-facebook-f"></i>{" "}
                        {/* Font Awesome Icon */}
                    </a>
                    <a
                        href="#"
                        aria-label="Instagram"
                        className="text-gray-500 hover:text-pink-500"
                    >
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a
                        href="#"
                        aria-label="Twitter"
                        className="text-gray-500 hover:text-blue-400"
                    >
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a
                        href="#"
                        aria-label="LinkedIn"
                        className="text-gray-500 hover:text-blue-700"
                    >
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>

                {/* Bottom Section: Links */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                    {/* Column 1: Your Health */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Your health
                        </h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Health history
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Current prescriptions
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Check your symptoms
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-blue-500">
                                    Book vaccinations
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 2: External Resources */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            External resources
                        </h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>
                                <a
                                    href="https://digital.nhs.uk/"
                                    className="hover:text-blue-500"
                                >
                                    NHS Digital
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.nhs.uk/service-search/find-a-gp/"
                                    className="hover:text-blue-500"
                                >
                                    Find my GP
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.nhs.uk/service-search/pharmacy/find-a-pharmacy/"
                                    className="hover:text-blue-500"
                                >
                                    Find my pharmacy
                                </a>
                            </li>
                            <li>
                                <a
                                    href="https://www.longtermplan.nhs.uk/"
                                    className="hover:text-blue-500"
                                >
                                    MedPlan
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Column 3: Contact Us */}
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Contact us
                        </h3>
                        <ul className="text-gray-600 space-y-2">
                            <li>Get in touch</li>
                            <li>📞 02005542453</li>
                            <li>✉️ contact@vodamed.com</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
