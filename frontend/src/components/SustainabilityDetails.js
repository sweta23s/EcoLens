// src/components/SustainabilityDetails.js

import React from 'react';
import ReactMarkdown from 'react-markdown'; // Import react-markdown
import "../CSS/App.css"
import '../CSS/SustainabilityDetails.css'; // Import your CSS file for styling

const SustainabilityDetails = ({ productData }) => {
    const { brandName, score, generatedText } = productData;

    return (
        <div className="sustainability-container">
            <h2>{brandName}</h2>
            <h3>Overall Sustainability Score: <span className="score">{score}</span></h3>
            <div className="score-breakdown">
                {/* Render the entire generatedText as Markdown */}
                <ReactMarkdown>{generatedText}</ReactMarkdown>
            </div>
        </div>
    );
};

export default SustainabilityDetails;

