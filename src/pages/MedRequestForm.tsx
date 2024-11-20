import React from 'react';

const MedRequestForm = () => {
    return (
        <div className="flex flex-col md:flex-row w-full p-8">
            {/* Selected Products Summary */}
            <aside className="w-full md:w-1/3 p-4 border rounded-lg shadow-md bg-white">
                <h3 className="text-xl font-semibold mb-4">Summary</h3>
                <p className="text-gray-600 mb-6">Your selected products</p>
                
                <div className="space-y-4">
                    {/* Example Product Item */}
                    {[1, 2, 3].map((item) => (
                        <div key={item} className="flex flex-col items-start border p-4 rounded-lg shadow-sm">
                            <img 
                                src="https://via.placeholder.com/100" 
                                alt="Medication" 
                                className="w-24 h-24 object-cover rounded mb-4" 
                            />
                            <h4 className="text-lg font-semibold">Medication Name</h4>
                            <p className="text-sm text-gray-500">
                                Brief description of the medication. This should be short to fit the box properly.
                            </p>
                            <p className="text-lg font-semibold mt-2">£12.99</p>
                            <button className="mt-2 text-blue-500">Remove</button>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Order Form */}
            <main className="flex-1 p-8 md:ml-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6">Complete your order</h2>

                <form className="space-y-6">
                    {/* Personal Details */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="First Name" 
                                className="border p-2 rounded w-full"
                            />
                            <input 
                                type="text" 
                                placeholder="Last Name" 
                                className="border p-2 rounded w-full"
                            />
                            <input 
                                type="email" 
                                placeholder="Email" 
                                className="border p-2 rounded w-full md:col-span-2"
                            />
                        </div>
                    </div>

                    {/* Payment Details */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <select className="border p-2 rounded w-full">
                                <option value="visa">Visa</option>
                                <option value="stripe">Stripe</option>
                                <option value="paypal">PayPal</option>
                                <option value="applepay">Apple Pay</option>
                            </select>
                            <input 
                                type="text" 
                                placeholder="Card Number" 
                                className="border p-2 rounded w-full"
                            />
                            <input 
                                type="text" 
                                placeholder="Expiration Date" 
                                className="border p-2 rounded w-full"
                            />
                            <input 
                                type="text" 
                                placeholder="CVV" 
                                className="border p-2 rounded w-full"
                            />
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input 
                                type="text" 
                                placeholder="Address Line 1" 
                                className="border p-2 rounded w-full"
                            />
                            <input 
                                type="text" 
                                placeholder="Address Line 2" 
                                className="border p-2 rounded w-full"
                            />
                            <input 
                                type="text" 
                                placeholder="City" 
                                className="border p-2 rounded w-full"
                            />
                            <input 
                                type="text" 
                                placeholder="Postal Code" 
                                className="border p-2 rounded w-full"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-8">
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Complete Purchase
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
};

export default MedRequestForm;