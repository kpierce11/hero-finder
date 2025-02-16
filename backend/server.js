require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const md5 = require('md5');

const app = express();
app.use(cors()); // Allow frontend to access this server
app.use(express.json());

const PORT = process.env.PORT || 5000;
const MARVEL_API_URL = "https://gateway.marvel.com/v1/public/characters";

// Load API keys from environment variables
const PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;

// Generate Marvel API authentication parameters
const getAuthParams = () => {
    const timestamp = new Date().getTime();
    const hash = md5(`${timestamp}${PRIVATE_KEY}${PUBLIC_KEY}`);
    return { ts: timestamp, apikey: PUBLIC_KEY, hash };
};

// Endpoint to fetch a character by name
app.get('/api/characters', async (req, res) => {
    try {
        const { name } = req.query;
        const response = await axios.get(MARVEL_API_URL, {
            params: { name, ...getAuthParams() },
        });
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from Marvel:", error.message);
        res.status(500).json({ error: "Error fetching data from Marvel" });
    }
});

// Start the backend server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
