import React, { useState, useEffect } from "react";
import "./Medications.css";
import Spinner from "../components/Spinner";

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
    const [typeFilter, setTypeFilter] = useState<string | null>(null); // 'prescription' or 'over-the-counter'
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
        min: "",
        max: "",
    });
    const [inStockOnly, setInStockOnly] = useState<boolean>(false);

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
                    image: medicine.image || "default-image.jpg",
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
                    {filtersVisible ? "Hide Filters" : "Show Filters"}
                </button>
            </div>

            {/* Filters Section */}
            <aside
                className={`p-4 border-b md:border-r md:h-screen md:sticky md:top-0 ${
                    filtersVisible ? "block" : "hidden"
                } md:block`}
            >
                <h3 className="AsideTitle">Filters</h3>
                <br />

                {/* Type Filter */}
                <p className="AsideSub">Type</p>
                <div className="flex flex-col space-y-3">
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="typeFilter"
                            value="prescription"
                            className="mr-2"
                            checked={typeFilter === "prescription"}
                            onChange={() => setTypeFilter("prescription")}
                        />
                        Prescription
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="typeFilter"
                            value="over-the-counter"
                            className="mr-2"
                            checked={typeFilter === "over-the-counter"}
                            onChange={() => setTypeFilter("over-the-counter")}
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

                <br />

                {/* Price Range Filter */}
                <p className="AsideSub">Price Range</p>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        className="border p-2 w-16"
                        inputMode="numeric"
                        pattern="\d*"
                        value={priceRange.min}
                        onChange={(e) =>
                            setPriceRange({
                                ...priceRange,
                                min: e.target.value.replace(/\D/, ""),
                            })
                        }
                        placeholder="Min"
                    />
                    <span>-</span>
                    <input
                        type="text"
                        className="border p-2 w-16"
                        inputMode="numeric"
                        pattern="\d*"
                        value={priceRange.max}
                        onChange={(e) =>
                            setPriceRange({
                                ...priceRange,
                                max: e.target.value.replace(/\D/, ""),
                            })
                        }
                        placeholder="Max"
                    />
                </div>

                <br />

                {/* Stock Filter */}
                <p className="AsideSub">Stock</p>
                <label className="flex items-center">
                    <input
                        type="checkbox"
                        className="mr-2"
                        checked={inStockOnly}
                        onChange={(e) => setInStockOnly(e.target.checked)}
                    />
                    In Stock Only
                </label>

                <br />

                {/* Filter Buttons */}
                <div className="flex flex-col space-y-2">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                        onClick={applyFilters}
                    >
                        Apply Filters
                    </button>
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-lg"
                        onClick={clearFilters}
                    >
                        Clear Filters
                    </button>
                </div>
            </aside>

            {/* Medications Grid */}
            <main className="flex-1 p-6">
                <h2 className="text-2xl font-semibold mb-6">Medications</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                    {filteredMedications.map((medication) => (
                        <div
                            key={medication.id}
                            className="border p-4 flex flex-col items-center"
                        >
                            <div className="w-full aspect-square overflow-hidden rounded-lg">
                                <img
                                    src={medication.image}
                                    alt={medication.name}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-center">
                                {medication.name}
                            </h3>
                            <h2 className="text-lg font-semibold mb-2 text-center">
                                £{medication.price}
                            </h2>
                            <button
                                className={`py-2 px-4 w-1/2 mt-2 rounded-lg ${
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
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default Medications;
