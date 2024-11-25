import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Medications.css";
import Spinner from "../components/Spinner";
import { addToBasket } from "../components/BasketFunctions";

const Medications = () => {
    const [medications, setMedications] = useState<
        {
            id: string;
            name: string;
            image: string;
            price: number;
            stock: number;
            type: string;
        }[]
    >([]);
    const [filteredMedications, setFilteredMedications] = useState<
        {
            id: string;
            name: string;
            image: string;
            price: number;
            stock: number;
            type: string;
        }[]
    >([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Filters state
    const [typeFilter, setTypeFilter] = useState<string | null>(null);
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
        min: "",
        max: "",
    });
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);

    // Check if user is a doctor
    const [isDoctor, setIsDoctor] = useState<boolean>(false);

    // Mobile Filters Toggle
    const [filtersVisible, setFiltersVisible] = useState<boolean>(false);

    useEffect(() => {
        try {
            const cachedMedicines = JSON.parse(
                localStorage.getItem("medicines") || "[]"
            );
            const formattedMedicines = cachedMedicines.map(
                (medicine: {
                    _id: string;
                    name: string;
                    image?: string;
                    price: number;
                    stock: number;
                    type: string;
                }) => ({
                    id: medicine._id,
                    name: medicine.name,
                    image: medicine.image || "noImage.jpg",
                    price: medicine.price,
                    stock: medicine.stock,
                    type: medicine.type,
                })
            );
  
            setMedications(formattedMedicines);
            setFilteredMedications(formattedMedicines);
        } catch (err) {
            console.error("Error loading medicines from localStorage:", err);
            setError("Failed to load medicines.");
        } finally {
            setLoading(false);
        }
            // Check if user is a doctor
        const isDoctorValue = localStorage.getItem("isDoctor") === "true";
        setIsDoctor(isDoctorValue);
  }, []);

    

    const applyFilters = () => {
        let filtered = [...medications];

        if (typeFilter) {
            filtered = filtered.filter((med) => med.type === typeFilter);
        }

        const minPrice = parseFloat(priceRange.min) || 0;
        const maxPrice = parseFloat(priceRange.max) || Infinity;
        filtered = filtered.filter(
            (med) => med.price >= minPrice && med.price <= maxPrice
        );

        if (inStockOnly) {
            filtered = filtered.filter((med) => med.stock > 0);
        }

        setFilteredMedications(filtered);
    };

    const clearFilters = () => {
        setTypeFilter(null);
        setPriceRange({ min: "", max: "" });
        setInStockOnly(false);
        setFilteredMedications(medications);
    };

    if (loading) {
        return <Spinner />;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col md:flex-row w-full">
          {/* Mobile Filters Toggle */}
          <div className="md:hidden p-4">
            <button
              className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full"
              onClick={() => setFiltersVisible(!filtersVisible)}
            >
              {filtersVisible ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>
    
          {/* Filters Section */}
          <aside
            className={`p-12 border-b md:border-r md:h-screen md:sticky md:top-0 ${
              filtersVisible ? 'block' : 'hidden'
            } md:block`}
          >
            <h3 className="text-2xl font-bold mb-4">Filters</h3>
    
            {/* Type Filter */}
            <p className="text-lg font-semibold mb-2">Type</p>
            <div className="flex flex-col space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="typeFilter"
                  value="prescription"
                  className="mr-2"
                  checked={typeFilter === 'prescription'}
                  onChange={() => setTypeFilter('prescription')}
                />
                Prescription
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="typeFilter"
                  value="over-the-counter"
                  className="mr-2"
                  checked={typeFilter === 'over-the-counter'}
                  onChange={() => setTypeFilter('over-the-counter')}
                />
                Over the Counter
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="typeFilter"
                  value=""
                  className="mr-2"
                  checked={typeFilter === null}
                  onChange={() => setTypeFilter(null)}
                />
                All
              </label>
            </div>
    
            {/* Price Range Filter */}
            <p className="text-lg font-semibold mt-6 mb-2">Price Range</p>
            <div className="flex items-center space-x-4">
              <input
                type="text"
                className="border p-2 w-16 rounded"
                inputMode="numeric"
                pattern="\d*"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    min: e.target.value.replace(/\D/, ''),
                  })
                }
                placeholder="Min"
              />
              <span>-</span>
              <input
                type="text"
                className="border p-2 w-16 rounded"
                inputMode="numeric"
                pattern="\d*"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({
                    ...priceRange,
                    max: e.target.value.replace(/\D/, ''),
                  })
                }
                placeholder="Max"
              />
            </div>
    
            {/* Stock Filter */}
            <p className="text-lg font-semibold mt-6 mb-2">Stock</p>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
              />
              In Stock Only
            </label>
    
            {/* Filter Buttons */}
            <div className="flex flex-col space-y-2 mt-6">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={clearFilters}
              >
                Clear Filters
              </button>
            </div>
          </aside>
    
          {/* Medications Grid */}
          <main className="flex-1 p-12">
            <h2 className="text-5xl font-bold mb-16">Medications</h2>
            {filteredMedications.length === 0 ? (
              <p className="text-center text-gray-600">No medications found.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
                {filteredMedications.map((medication) => (
                  <div
                    key={medication.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105"
                  >
                    <Link to={`/medicine/${medication.id}`}>
                      <div className="w-full h-48 overflow-hidden">
                        <img
                          src={medication.image}
                          alt={medication.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                    </Link>
                    <div className="p-4 flex flex-col justify-between h-56">
                      <div>
                        <Link to={`/medicine/${medication.id}`}>
                          <h3 className="text-xl font-semibold mb-2 text-gray-800 hover:text-blue-600">
                            {medication.name}
                          </h3>
                        </Link>
                        <p className="text-gray-600 mb-4">
                          {medication.type === 'prescription'
                            ? 'Prescription'
                            : 'Over the counter'}
                        </p>
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-blue-800 mb-4">
                          £{medication.price.toFixed(2)}
                        </h2>
                        {(isDoctor || medication.type !== "prescription") && (
                      <button
                        onClick={() => {
                          addToBasket(medication.id, 1);
                          window.dispatchEvent(new Event("storage"));
                        }}
                        className={`w-full py-2 px-4 rounded-lg ${
                          medication.stock > 0
                            ? "bg-blue-500 text-white hover:bg-blue-600"
                            : "bg-gray-300 text-gray-700 cursor-not-allowed"
                        }`}
                        disabled={medication.stock === 0}
                      >
                        {medication.stock > 0
                          ? "Add to Cart"
                          : "Out of Stock"}
                      </button>
                    )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </main>
        </div>
      );
};

export default Medications;
