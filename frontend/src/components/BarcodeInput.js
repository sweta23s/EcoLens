// src/components/BarcodeInput.js

import React, { useState } from 'react';
import axios from 'axios';
import "../CSS/App.css"

const BarcodeInput = ({ setProductData }) => {
    const [barcode, setBarcode] = useState(''); // State to hold the barcode input
    const [loading, setLoading] = useState(false);

    const handleInputChange = (event) => {
        setBarcode(event.target.value); // Update barcode state on input change
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!barcode) return; // Ensure barcode is provided

        setLoading(true);
        try {
            // Sending barcode number in the request body
            const backendUrl = process.env.REACT_APP_BACKEND_URL;

            console.log("Backend URL:", process.env.REACT_APP_BACKEND_URL);



            const response = await axios.post(`${backendUrl}/process-barcode`, {
                barcode: barcode,
            });
            setProductData(response.data); // Update the product data with the response
        } catch (error) {
            console.error('Error processing barcode:', error); // Log error in console
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className='barcode-input'>
            <h2>Enter Product Barcode Number</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={barcode}
                    onChange={handleInputChange}
                    placeholder="Enter Barcode"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Processing...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

export default BarcodeInput;

