import { Sling as Hamburger } from "hamburger-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaTimes, FaShoppingCart } from "react-icons/fa"; // Add FaShoppingCart
import { useAuth } from "../components/authentication/authContext";

const Menu = () => {
    const [isOpen, setOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    useEffect(() => {
        console.log("Menu component, isAuthenticated:", isAuthenticated);
    }, [isAuthenticated]);

    const handleLogout = () => {
        logout();
    };

    const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchQuery = event.currentTarget.search.value;
        console.log("Search Query:", searchQuery);
    };

    return (
        <div className="relative font-sans py-2 z-50 border-b border-gray-300 ">
            <div className="flex justify-between items-center px-6 py-2 text-gray-800 ">
                {/* Hamburger Menu (Mobile) */}
                <div className="lg:hidden">
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                </div>

                {/* Links (Desktop Only) */}
                <div className="hidden lg:flex space-x-5 p-3 text-xl">
                    <Link to="/dashboard" className="hover:text-gray-400">
                        Dashboard
                    </Link>
                    <Link to="/medications" className="hover:text-gray-400">
                        Medications
                    </Link>
                    <Link to="/" className="hover:text-gray-400">
                        My prescriptions
                    </Link>
                    <Link to="/about" className="hover:text-gray-400">
                        About
                    </Link>
                    <Link to="/contact" className="hover:text-gray-400">
                        Contact
                    </Link>
                </div>

                {/* Logo */}
                <div className="absolute left-1/2 transform -translate-x-1/2">
                    <Link to={"/dashboard"}>
                        <img
                            src={`${import.meta.env.BASE_URL}logo.png`}
                            alt="Logo"
                            className="h-16"
                        />
                    </Link>
                </div>

                {/* Search and Basket */}
                <div className="flex items-center space-x-4 text-xl">
                    {/* Search Icon */}
                    {!isSearchOpen ? (
                        <FaSearch
                            className="cursor-pointer"
                            onClick={() => setIsSearchOpen(true)}
                        />
                    ) : (
                        <form onSubmit={handleSearch} className="flex items-center">
                            <input
                                type="text"
                                name="search"
                                className="bg-white border border-gray-300 rounded pl-2 py-1 w-48 focus:outline-none"
                                placeholder="Search..."
                                autoFocus
                            />
                            <FaTimes
                                className="ml-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                                onClick={() => setIsSearchOpen(false)}
                            />
                        </form>
                    )}

                    {/* Basket Icon */}
                    <Link to="/medrequest" aria-label="Basket">
                        <FaShoppingCart className="cursor-pointer hover:text-gray-400" />
                    </Link>

                    {/* Logout Button */}
                    {isAuthenticated && (
                        <button
                            onClick={handleLogout}
                            className="hover:text-gray-400 focus:outline-none font-bold"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Nav Menu */}
            <nav
                className={`lg:hidden absolute top-0 left-0 w-full bg-white text-gray-800 transform ${
                    isOpen ? "translate-y-0" : "-translate-y-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <ul className="flex flex-col items-left pl-7 py-4 space-y-4 text-xl">
                    <li>
                        <Link to="/dashboard" onClick={() => setOpen(false)}>
                            Dashboard
                        </Link>
                    </li>
                    <li>
                        <Link to="/medications" onClick={() => setOpen(false)}>
                            Medications
                        </Link>
                    </li>
                    <li>
                        <Link to="/" onClick={() => setOpen(false)}>
                            My prescriptions
                        </Link>
                    </li>
                    <li>
                        <Link to="/about" onClick={() => setOpen(false)}>
                            About
                        </Link>
                    </li>
                    <li>
                        <Link to="/contact" onClick={() => setOpen(false)}>
                            Contact
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Menu;