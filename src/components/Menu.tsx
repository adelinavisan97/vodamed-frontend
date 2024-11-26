// components/Menu.tsx
import { Sling as Hamburger } from "hamburger-react";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaTimes } from "react-icons/fa";
import { useAuth } from "../components/authentication/authContext";
import { getBasket } from "./BasketFunctions";

const Menu = () => {
    const [isOpen, setOpen] = useState(false);
    const { isAuthenticated, logout } = useAuth();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [basketCount, setBasketCount] = useState(0);
    const [isDoctor, setIsDoctor] = useState<boolean>(false);

    useEffect(() => {
        console.log("Menu component, isAuthenticated:", isAuthenticated);

        const isDoctorValue = localStorage.getItem("isDoctor") === "true";
        setIsDoctor(isDoctorValue);
        // Initialize basket
        const updateBasketCount = () => {
            const basket = getBasket();
            const count = basket.reduce((total, item) => total + item.quantity, 0);
            setBasketCount(count);
          };
      
          updateBasketCount();
      
          const handleStorageChange = () => {
            updateBasketCount();
          };
      
          window.addEventListener("storage", handleStorageChange);
      
          return () => {
            window.removeEventListener("storage", handleStorageChange);
          };

    }, [isAuthenticated]);

     

    const handleLogout = () => {
        logout();
    };

   const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
       event.preventDefault();
       const searchQuery = event.currentTarget.search.value;
       console.log("Search Query:", searchQuery);
   };

    if (!isAuthenticated) {
        return (
            <div className="relative font-sans py-2 border-b border-gray-150 z-50">
                <div className="flex justify-between items-center px-6 py-2 text-gray-800">
                    <div className="lg:hidden">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                    </div>
                    <div className="hidden lg:flex space-x-5 p-3 text-xl">
                        <Link to="/about" className="hover:text-gray-400">
                            About
                        </Link>
                        <Link to="/contact" className="hover:text-gray-400">
                            Contact
                        </Link>
                    </div>
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Link to={"/dashboard"}>
                            <img
                                src={`${import.meta.env.BASE_URL}logo.png`}
                                alt="Logo"
                                className="h-16"
                            />
                        </Link>
                    </div>
                    <div className="relative">
                        {!isSearchOpen && (
                            <FaSearch
                                className="cursor-pointer"
                                onClick={() => setIsSearchOpen(true)}
                            />
                        )}
                        {isSearchOpen && (
                            <form
                                onSubmit={handleSearch}
                                className="flex items-center"
                            >
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
                    </div>
                </div>
                <nav
                    className={`lg:hidden absolute top-0 left-0 w-full bg-white text-gray-800 transform ${
                        isOpen ? "translate-y-0" : "-translate-y-full"
                    } transition-transform duration-300 ease-in-out`}
                >
                    <div className="flex justify-between items-center p-4 bg-white text-gray-800">
                        <Hamburger toggled={isOpen} toggle={setOpen} />
                        <div className="absolute left-1/2 transform -translate-x-1/2">
                            <Link to={"/dashboard"}>
                                <img
                                    src={`${import.meta.env.BASE_URL}logo.png`}
                                    alt="Logo"
                                    className="h-16 w-auto"
                                />
                            </Link>
                        </div>
                        {/* <div className="relative">
                            {!isSearchOpen && (
                                <FaSearch
                                    className="text-2xl cursor-pointer"
                                    onClick={() => setIsSearchOpen(true)}
                                />
                            )}
                            {isSearchOpen && (
                                <form
                                    onSubmit={handleSearch}
                                    className="flex items-center"
                                >
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
                        </div> */}
                    </div>
                    <ul className="flex flex-col items-left pl-7 py-4 space-y-4 text-xl">
                        <li className="hover:text-gray-400">
                            <Link to="/about" onClick={() => setOpen(false)}>
                                About
                            </Link>
                        </li>
                        <li className="hover:text-gray-400">
                            <Link to="/contact" onClick={() => setOpen(false)}>
                                Contact
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        );
    }

   return (
       <div className="relative font-sans py-2 z-50">
           <div className="flex justify-between items-center px-6 py-2 text-gray-800">
               <div className="lg:hidden">
                   <Hamburger toggled={isOpen} toggle={setOpen} />
               </div>
               <div className="hidden lg:flex space-x-5 p-3 text-xl">
                   <Link to="/dashboard" className="hover:text-gray-400">
                       Dashboard
                   </Link>
                   <Link
                       to={isDoctor ? "/prescriptions/allocate" : "/prescriptions/review"}
                       className="hover:text-gray-400"
                   >
                       Prescriptions
                   </Link>
                   <Link to="/about" className="hover:text-gray-400">
                       About
                   </Link>
                   <Link to="/medications" className="hover:text-gray-400">
                       Shop
                   </Link>
                   <Link to="/contact" className="hover:text-gray-400">
                       Contact
                   </Link>
               </div>
               <div className="absolute left-1/2 transform -translate-x-1/2">
                   <Link to={"/dashboard"}>
                       <img
                           src={`${import.meta.env.BASE_URL}logo.png`}
                           alt="Logo"
                           className="h-16"
                       />
                   </Link>
               </div>

                <div className="flex items-center space-x-4 text-xl">
                    {/* {!isSearchOpen && (
                        <FaSearch
                            className="cursor-pointer"
                            onClick={() => setIsSearchOpen(true)}
                        />
                    )}
                    {isSearchOpen && (
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center"
                        >
                            <input
                                type="text"
                                name="search"
                                className="bg-white border border-gray-300 rounded pl-2 py-1 w-48 transition-all ease-in-out duration-300 focus:outline-none"
                                placeholder="Search..."
                                autoFocus
                            />
                            <FaTimes
                                className="ml-2 text-gray-600 hover:text-gray-800 cursor-pointer"
                                onClick={() => setIsSearchOpen(false)}
                            />
                        </form>
                    )} */}
                    <Link to="/medrequest" aria-label="Basket" className="relative">
                        <FaShoppingCart className="cursor-pointer hover:text-gray-400" />
                        {basketCount > 0 && (
                        <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                            {basketCount}
                        </span>
                        )}
                    </Link>
                    {isAuthenticated && (
                        <button
                        onClick={handleLogout}
                        className="hover:text-gray-400 focus:outline-none"
                        >
                        Logout
                        </button>
                    )}
                    </div>
            </div>
            <nav
                className={`lg:hidden absolute top-0 left-0 w-full bg-white text-gray-800 transform ${
                    isOpen ? "translate-y-0" : "-translate-y-full"
                } transition-transform duration-300 ease-in-out`}
            >
                <div className="flex justify-between items-center p-4 bg-white text-gray-800">
                    <Hamburger toggled={isOpen} toggle={setOpen} />
                    <div className="absolute left-1/2 transform -translate-x-1/2">
                        <Link to={"/dashboard"}>
                            <img
                                src={`${import.meta.env.BASE_URL}logo.png`}
                                alt="Logo"
                                className="h-16 w-auto"
                            />
                        </Link>
                    </div>
                    {/* {!isSearchOpen && (
                        <FaSearch
                            className="text-2xl cursor-pointer"
                            onClick={() => setIsSearchOpen(true)}
                        />
                    )}
                    {isSearchOpen && (
                        <form
                            onSubmit={handleSearch}
                            className="flex items-center"
                        >
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
                    )} */}
                    <Link to="/medrequest" aria-label="Basket">
                        <FaShoppingCart className="cursor-pointer hover:text-gray-400" />
                    </Link>
                </div>
                <ul className="flex flex-col items-left pl-7 py-4 space-y-4 text-xl">
                    <li className="hover:text-gray-400">
                        <Link to="/dashboard" onClick={() => setOpen(false)}>
                            Dashboard
                        </Link>
                    </li>
                    <li className="hover:text-gray-400">
                        <Link
                        to={isDoctor ? "/prescriptions/allocate" : "/prescriptions/review"}
                        className="hover:text-gray-400"
                        >
                            Prescriptions
                        </Link>
                    </li>
                    <li className="hover:text-gray-400">
                        <Link to="/about" onClick={() => setOpen(false)}>
                            About
                        </Link>
                    </li>
                    <li className="hover:text-gray-400">
                        <Link to="/medications" onClick={() => setOpen(false)}>
                            Shop
                        </Link>
                    </li>
                    <li className="hover:text-gray-400">
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