// pages/Contact.tsx
import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        street: '',
        city: '',
        postcode: '',
        phone: '',
        email: '',
        message: '',
        agreeToBeContacted: false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
        // Submit form data to server or handle it as needed
    };

    return (
        <div className="flex flex-col md:flex-row h-screen">
            {/* Left side: Contact form */}
            <div className="w-full md:w-2/3 flex flex-col items-center md:items-start p-4">
                <h2 className="form-title">Get in <span className="highlight">touch</span></h2>

                <form onSubmit={handleSubmit} className="contact-form">
                <p>Enter your details using the form below and we'll get back to you as soon as we can!</p>
                    <input
                        type="text"
                        name="name"
                        placeholder="Contact name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="text"
                        name="street"
                        placeholder="Street"
                        value={formData.street}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <div className="form-row">
                        <input
                            type="text"
                            name="city"
                            placeholder="City"
                            value={formData.city}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                        <input
                            type="text"
                            name="postcode"
                            placeholder="Postcode"
                            value={formData.postcode}
                            onChange={handleChange}
                            className="form-input"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        name="phone"
                        placeholder="Contact Phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Let us know how we can help"
                        value={formData.message}
                        onChange={handleChange}
                        className="form-input"
                        required
                    />
                    <label className="checkbox-container">
                        <input
                            type="checkbox"
                            name="agreeToBeContacted"
                            checked={formData.agreeToBeContacted}
                            onChange={handleChange}
                            className="checkbox-input"
                        />
                        I agree to be contacted via email, telephone, or post
                    </label>
                    <button type="submit" className="submit-button">Submit</button>
                </form>
            </div>

            {/* Right side: Animation */}
            <div className="w-full md:w-2/3 hidden md:block bg-cover bg-center">
                <iframe
                    style={{ width: "80%", height: "80%" }}
                    src="https://lottie.host/embed/43e45d2e-0551-451c-9fc7-aa21054e75e5/NeBNfL4I0S.json"
                    title="Contact Animation"
                ></iframe>
            </div>
        </div>
    );
};

export default Contact;