require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const md5 = require('md5');
const fs = require('fs');
const path = require('path');

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


app.get('/api/local-characters', (req, res) => {
    const filePath = path.join(__dirname, 'data', 'characters.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading characters.json:", err);
            return res.status(500).json({ error: "Failed to load character names" });
        }

        try {
            const characters = JSON.parse(data);
            const characterNames = characters;
            res.json(characterNames);
        } catch (parseError) {
            console.error("Error parsing characters.json:", parseError);
            res.status(500).json({ error: "Invalid JSON format in characters.json" });
        }
    });
});


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


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
