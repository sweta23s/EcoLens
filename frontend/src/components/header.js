import React, { useState, useEffect } from 'react';
import '../CSS/Header.css';  // Assuming you have the CSS in a separate file

const Header = () => {
    const tips = [
        "Reduce, reuse, and recycle to minimize waste.",
        "Turn off lights when not in use to save energy.",
        "Opt for reusable bags instead of plastic ones.",
        "Conserve water by taking shorter showers.",
        "Plant trees to offset your carbon footprint.",
        "Choose energy-efficient appliances.",
        "Support sustainable businesses.",
        "Walk, bike, or use public transportation.",
        "Avoid single-use plastics.",
        "Compost food scraps to create nutrient-rich soil.",
        "Repair broken items instead of replacing them.",
        "Buy local produce to reduce transportation emissions.",
        "Insulate your home to improve energy efficiency.",
        "Use renewable energy sources like solar or wind power.",
        "Educate yourself and others about sustainability.",
        "Reduce, reuse, and recycle paper products.",
        "Choose sustainable materials for your home.",
        "Support eco-friendly packaging.",
        "Avoid excessive consumption.",
        "Participate in community clean-up efforts.",
        "Minimize food waste by planning meals and storing leftovers properly.",
        "Choose sustainable seafood options.",
        "Support ethical fashion brands.",
        "Reduce your meat consumption or opt for plant-based alternatives.",
        "Avoid using harmful chemicals in your home.",
        "Limit your use of disposable items.",
        "Support sustainable agriculture practices.",
        "Reduce your consumption of bottled water.",
        "Choose products with minimal packaging.",
        "Support organizations working on environmental conservation.",
        "Avoid using excessive amounts of fertilizer and pesticides.",
        "Choose sustainable transportation options for travel.",
        "Support renewable energy initiatives.",
        "Reduce your consumption of palm oil.",
        "Avoid using excessive amounts of water for landscaping.",
        "Support fair trade products.",
        "Reduce your consumption of unnecessary items.",
        "Choose sustainable cleaning products.",
        "Support local farmers' markets.",
        "Avoid using harmful chemicals for pest control.",
        "Support reforestation efforts.",
        "Choose sustainable building materials.",
        "Reduce your consumption of processed foods.",
        "Avoid using excessive amounts of heating and cooling.",
        "Support organizations working on climate change mitigation.",
        "Choose sustainable flooring options.",
        "Support sustainable tourism.",
        "Choose sustainable furniture options.",
        "Support organizations working on wildlife conservation."
    ];
    

    const [currentTipIndex, setCurrentTipIndex] = useState(0);
    const [displayTip, setDisplayTip] = useState("");
    const [charIndex, setCharIndex] = useState(0);

    // Typing animation logic
    useEffect(() => {
        // Clear the previous interval to avoid overlap
        const clearTipInterval = setInterval(() => {
            if (charIndex < tips[currentTipIndex].length) {
                setDisplayTip((prev) => prev + tips[currentTipIndex][charIndex]);
                setCharIndex((prevCharIndex) => prevCharIndex + 1);
            } else {
                clearInterval(clearTipInterval);

                // After 5 seconds, reset the tip and move to the next one
                setTimeout(() => {
                    setDisplayTip("");
                    setCharIndex(0);
                    setCurrentTipIndex((prevIndex) => (prevIndex + 1) % tips.length);
                }, 5000);
            }
        }, 100); // Speed of typing animation

        // Cleanup on component unmount or when tip changes
        return () => clearInterval(clearTipInterval);
    }, [charIndex, currentTipIndex]);

    return (
        <header className="header">
            <div className="overlay">
                <h1>EcoLens</h1>
                <div className="tip-container">
                    <p id="tip-text">{displayTip}</p>
                </div>
            </div>
        </header>
    );
};

export default Header;
