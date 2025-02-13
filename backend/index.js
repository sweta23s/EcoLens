const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');
const puppeteer = require('puppeteer'); // Include Puppeteer for scraping
const { GoogleGenerativeAI } = require("@google/generative-ai");


dotenv.config();

const app = express();

const corsOptions = {
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], 
    allowedHeaders: ["Content-Type"],
    credentials: true,
};
app.use(cors(corsOptions));

// Handle Preflight Requests Manually
app.options('*', cors(corsOptions));


app.use(express.json());

const PORT = process.env.PORT || 5000;



// Function to lookup product details by barcode
async function lookupProductByBarcode(barcode) {
    const barcodeLookupURL = `https://api.barcodelookup.com/v3/products?barcode=${barcode}&formatted=y&key=${process.env.BARCODE_LOOKUP_API_KEY}`;

    try {
        const response = await axios.get(barcodeLookupURL);
        const productData = response.data;
        console.log(productData)

        // Extract product details from the response
        if (productData && productData.products && productData.products.length > 0) {
            const item = productData.products[0]; // Assuming you want the first item
            return {
                brandName: item.brand || 'Unknown Brand',
                title: item.title || 'No Title Available',
                description: item.description || 'No Description Available',
                features: item.features || [],
                // Add any other fields you need
            };
        } else {
            return { brandName: 'Unknown Brand', features: [] }; 
        }
    } catch (error) {
        console.error('Error during barcode lookup:', error.message);
        return { brandName: 'Unknown Brand' }; // Default fallback
    }
}

// Scrape additional brand information
async function scrapeBrandDetails(brandName) {
    const searchURL = `https://www.google.com/search?q=${encodeURIComponent(brandName)}`;

    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        await page.setUserAgent('Mozilla/5.0');
        await page.goto(searchURL, { waitUntil: 'networkidle2' });

        const brandDetails = await page.evaluate(() => {
            let details = '';
            const elements = document.querySelectorAll('div');
            elements.forEach((element) => {
                details += element.innerText + '\n';
            });
            return details;
        });

        await browser.close();
        return brandDetails;
    } catch (error) {
        console.error('Error during web scraping:', error.message);
        return 'No details available';
    }
}






// Image Upload Route
// Image Upload Route (Now accepting barcode input directly)
app.post('/process-barcode', async (req, res) => {
    // Extract barcode from the request body
    const { barcode } = req.body;

    console.log('Received Barcode:', barcode);

    // Validate the barcode
    if (!barcode) {
        return res.status(400).json({ error: 'Barcode number is required.' });
    }

    try {
        // Lookup product details using the barcode
        const productInfo = await lookupProductByBarcode(barcode);
        console.log('Product Info:', productInfo);

        if (!productInfo || !productInfo.brandName) {
            return res.status(404).json({ error: 'Product not found' });
        }

        const brandName = productInfo.brandName;

        // Scrape additional brand details for the prompt
        const brandDetails = await scrapeBrandDetails(brandName);

        // Create a prompt for the Google Gemini API using brand and product details
        const prompt = `
                Rate the sustainability of the following product on a scale from 1 to 100, considering the following parameters:
                1. **Materials**: Assess the sourcing and composition of the ingredients, including the use of natural vs. synthetic materials.
                2. **Energy Usage**: Evaluate the energy efficiency of the manufacturing process and any renewable energy practices employed.
                3. **Waste Management**: Analyze the product's packaging and the effectiveness of recycling or disposal methods.
                4. **Social Responsibility**: Consider the ethical practices in sourcing, labor conditions, and community impact.
                5. **Economic Impact**: Reflect on the product’s affordability and its overall contribution to the local economy.

                Product Details:
                - **Brand**: ${brandName}
                - **Title**: ${productInfo.title}
                - **Description**: ${productInfo.description}
                - **Features**: ${productInfo.features.join(', ')}
                - **Brand Details**: ${brandDetails}

                Please provide the result in the following format:
                Score: score#, Details: "A detailed explanation of how the score was determined, including insights on each parameter.
                Also in response don't use any "*"
                `;
                        // Call Google Gemini API to get sustainability score using the prompt
        const {score, generatedText} = await getSustainabilityScoreFromGemini(prompt);

        // Send the response back with the extracted data and the score
        res.json({
            barcode,
            brandName,
            score,
            generatedText
        });

    } catch (error) {
        console.error('Error processing barcode or fetching data:', error.message);
        res.status(500).json({ error: 'Failed to process barcode or fetch product details' });
    }
});



// Function to call the Google Gemini API to score the product's sustainability8901138836122
async function getSustainabilityScoreFromGemini(prompt) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(prompt);
        

        const responseText = result.response.text();
        console.log(responseText);

        // Remove unwanted characters (like backticks) and any surrounding whitespace
        

        // Use the helper function to parse the score from the response text
        const score = parseScoreFromResponse(responseText);
        
        // Extract details from the cleaned response
        const detailsMatch = responseText.match(/Details:\s*(.*)/s);
        const generatedText = detailsMatch ? detailsMatch[1] : "No details available"; // Get details if available

        return { score, generatedText };

    } catch (error) {
        console.error('Error calling Gemini API:', error.message);
        throw new Error('Failed to get sustainability score from Google Gemini API');
    }
}

// Helper function to parse score from Gemini API response
function parseScoreFromResponse(responseText) {
    const scoreMatch = responseText.match(/Score:\s*(\d+),/); // Match score followed by a percentage
    return scoreMatch ? parseInt(scoreMatch[1], 10) : 50; // Default score if not found
}


// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
