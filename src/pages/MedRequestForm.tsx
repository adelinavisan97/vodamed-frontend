// MedRequestForm.tsx

import React, { useState, useEffect } from 'react';
import { getBasket, clearBasket, BasketItem, updateBasketItemQuantity } from '../components/BasketFunctions';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../authentication/apiClient';
import { useAuth } from '../components/authentication/authContext';

interface MedicineDbModel {
  _id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;
  stock: number;
}

interface BasketItemWithDetails {
  medicine: MedicineDbModel;
  quantity: number;
}

const MedRequestForm = () => {
  const [basketItems, setBasketItems] = useState<BasketItemWithDetails[]>([]);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // State for form fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  // Computed validation state
  const isFormValid =
    firstName.trim() !== '' &&
    lastName.trim() !== '' &&
    email.trim() !== '' &&
    addressLine1.trim() !== '' &&
    city.trim() !== '' &&
    postalCode.trim() !== '' &&
    basketItems.length > 0;

  useEffect(() => {
    // Retrieve basket items from localStorage
    const basket = getBasket(); // [{ medicineId, quantity }]
    const cachedMedicines: MedicineDbModel[] = JSON.parse(
      localStorage.getItem('medicines') || '[]'
    );

    const itemsWithDetails: BasketItemWithDetails[] = basket
      .map((basketItem) => {
        const medicine = cachedMedicines.find(
          (med) => med._id === basketItem.medicineId
        );
        if (medicine) {
          return {
            medicine,
            quantity: basketItem.quantity,
          };
        }
        return null;
      })
      .filter((item) => item !== null) as BasketItemWithDetails[];

    setBasketItems(itemsWithDetails);
  }, []);

  const handleQuantityChange = (medicineId: string, quantity: number) => {
    if (quantity < 1) return;

    updateBasketItemQuantity(medicineId, quantity);
    setBasketItems((prevItems) =>
      prevItems.map((item) =>
        item.medicine._id === medicineId
          ? { ...item, quantity }
          : item
      )
    );
    window.dispatchEvent(new Event('storage'));
  };

  const handleRemoveItem = (medicineId: string) => {
    updateBasketItemQuantity(medicineId, 0);
    setBasketItems((prevItems) =>
      prevItems.filter((item) => item.medicine._id !== medicineId)
    );
    window.dispatchEvent(new Event('storage'));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('authToken');

    const orderItems = basketItems.map((item) => ({
      medicine: item.medicine._id,
      quantity: item.quantity,
      price: item.medicine.price,
      total: item.medicine.price * item.quantity,
    }));

    const totalAmount = orderItems.reduce((sum, item) => sum + item.total, 0);

    const orderDate = new Date();

    const shippingAddress = `${addressLine1}, ${addressLine2}, ${city}, ${postalCode}`;

    const order = {
      user: userId,
      orderItems,
      totalAmount,
      orderDate,
      shippingAddress,
      paymentMethod,
      email
    };

    try {
        const response = await axios.post(`${API_URL}/users/createOrder`, order, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Order created successfully:', response.data);

      clearBasket();
      window.dispatchEvent(new Event('storage'));
      alert('Order created successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating order:', error);
      alert('An error occurred while creating your order. Please try again.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full p-8">
      <aside className="w-full md:w-1/3 p-4 border rounded-lg shadow-md bg-white">
        <h3 className="text-xl font-semibold mb-4">Summary</h3>
        <p className="text-gray-600 mb-6">Your selected products</p>

        <div className="space-y-4">
          {basketItems.length === 0 ? (
            <p>No items in the basket.</p>
          ) : (
            basketItems.map((item) => (
              <div
                key={item.medicine._id}
                className="flex flex-col items-start border p-4 rounded-lg shadow-sm"
              >
                <img
                  src={item.medicine.image || 'noImage.jpg'}
                  alt={item.medicine.name}
                  className="w-24 h-24 object-cover rounded mb-4"
                />
                <h4 className="text-lg font-semibold">{item.medicine.name}</h4>
                <p className="text-sm text-gray-500">{item.medicine.description}</p>
                <p className="text-lg font-semibold mt-2">£{item.medicine.price}</p>
                <div className="flex items-center mt-2">
                  <label className="mr-2">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    max={item.medicine.stock}
                    value={item.quantity}
                    onChange={(e) => {
                      const newQuantity = parseInt(e.target.value);
                      if (!isNaN(newQuantity)) {
                        handleQuantityChange(item.medicine._id, newQuantity);
                      }
                    }}
                    className="border rounded p-1 w-16 text-center"
                  />
                </div>
                <button
                  className="mt-2 text-blue-500"
                  onClick={() => handleRemoveItem(item.medicine._id)}
                >
                  Remove
                </button>
              </div>
            ))
          )}
        </div>
      </aside>

      <main className="flex-1 p-8 md:ml-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-6">Complete your order</h2>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="First Name"
                className="border p-2 rounded w-full"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="border p-2 rounded w-full"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded w-full md:col-span-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Payment Details */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Payment Details</h3>
            <p>This is a dummy payment. No actual payment processing will occur.</p>
            <select
              className="border p-2 rounded w-full"
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="credit-card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="bank-transfer">Bank Transfer</option>
            </select>
          </div>

          {/* Shipping Address */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Address Line 1"
                className="border p-2 rounded w-full"
                value={addressLine1}
                onChange={(e) => setAddressLine1(e.target.value)}
              />
              <input
                type="text"
                placeholder="Address Line 2"
                className="border p-2 rounded w-full"
                value={addressLine2}
                onChange={(e) => setAddressLine2(e.target.value)}
              />
              <input
                type="text"
                placeholder="City"
                className="border p-2 rounded w-full"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                type="text"
                placeholder="Postal Code"
                className="border p-2 rounded w-full"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end mt-8">
            <button
              type="submit"
              disabled={!isFormValid}
              className={`px-6 py-2 rounded-lg text-white ${
                isFormValid
                  ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Complete Purchase
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default MedRequestForm;
