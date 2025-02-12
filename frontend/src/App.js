// src/App.js
import React, { useState } from 'react';
import BarcodeInput from './components/BarcodeInput';
import ScanBarcode from './components/scanBarcode';
import ProductDetails from './components/ProductDetails';
import Header from './components/header';
import "./CSS/App.css"

function App() {
    const [productData, setProductData] = useState(null);

    return (
        <div className="App">
            <Header/>
            <div className="getDetails">
              <ScanBarcode setProductData={setProductData} />
              <BarcodeInput setProductData={setProductData} />
            </div>
            
            <ProductDetails productData={productData} />
        </div>
    );
}

export default App;


