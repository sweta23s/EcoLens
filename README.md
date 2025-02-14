# EcoLens

![image](https://github.com/user-attachments/assets/3921958c-776a-471a-82cf-b00295301113)

**EcoLens** is a sustainability analysis tool that allows users to scan a product barcode and get detailed sustainability scores based on various environmental and social parameters. It utilizes a barcode lookup API, web scraping, and Google's generative AI to gather and assess product sustainability information.

### Live Website: https://eco-lens-eta.vercel.app

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Contributing](#contributing)



## Features
- Barcode scanning and product lookup.
- Web scraping for additional product and brand information.
- Uses Google Generative AI to analyze product sustainability based on extracted data.
- Detailed breakdown of sustainability metrics including materials, energy usage, waste management, etc.

## Technologies Used
- **Frontend**: React, React Markdown
- **Backend**: Node.js, Express
- **APIs**: Barcode Lookup API, Google Generative AI
- **Web Scraping**: Puppeteer
- **Other**: Axios, CORS

## Installation

### Prerequisites
Make sure you have the following installed on your machine:
- Node.js (v14+)
- npm (v6+)

### Clone the repository
```bash
git clone https://github.com/sweta23s/EcoLens.git
cd EcoLens
```

### Setup environment variables
Create a `.env` file in the backend directory and add the following variables:
```env
FRONTEND_URL=http://localhost:3000
BARCODE_LOOKUP_API_KEY=<your-barcode-lookup-api-key>
API_KEY=<your-google-generative-ai-api-key>
```

Create a `.env` file in the frontend directory and add the following variables:
```env
REACT_APP_BACKEND_URL=http://localhost:5000
```

### Run the app
1. **Backend:**
   ```bash
   cd backend
   npm install
   node index.js
   ```
   This will start the backend server on `http://localhost:5000`.

2. **Frontend:**
   Open a new terminal and run:
   ```bash
   cd frontend
   npm install
   npm start
   ```
   The React app will run on `http://localhost:3000`.

## Usage
1. Enter a product barcode in the input field and submit.
2. The backend will fetch product details via the Barcode Lookup API and scrape additional data using Puppeteer.
3. The Google generative AI will then assess the product’s sustainability across various parameters and provide a score.
4. The results, including the score and breakdown, will be displayed on the frontend.

### Example Workflow
- Enter barcode `8901138836122` for a product.
- The app will return sustainability metrics such as **Materials**, **Energy Usage**, **Waste Management**, **Social Responsibility**, and **Economic Impact**.

## Environment Variables
- **FRONTEND_URL**: The URL of your frontend application.
- **REACT_APP_BACKEND_URL**: The URL of your backend application.
- **BARCODE_LOOKUP_API_KEY**: API key for Barcode Lookup.
- **API_KEY**: API key for Google generative AI.

## Project Structure
```plaintext
EcoLens/
│
├── backend/                      # Backend code
│   ├── index.js                  # Express server entry point
│   └── ...                       # Other backend files (routes, utils)
│
├── frontend/                     # Frontend React application
    ├── src/
    │   ├── components/           # React components
    │   ├── App.js                # Main app component
    │   └── ...                   # Other frontend files
    └── ...                       # Other frontend configs (package.json, etc.)

```

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add new feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Open a pull request.
