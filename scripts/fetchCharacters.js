import axios from 'axios';
import fs from 'fs';
import md5 from 'md5';
import dotenv from 'dotenv';

dotenv.config(); // Load API keys from .env file

const publicKey = process.env.MARVEL_PUBLIC_KEY;
const privateKey = process.env.MARVEL_PRIVATE_KEY;
const BASE_URL = "https://gateway.marvel.com/v1/public/characters";
const LIMIT = 100; // Max number of characters per request
let allCharacters = [];

const getAuthParams = () => {
    const ts = new Date().getTime();
    const hash = md5(`${ts}${privateKey}${publicKey}`);
    return { ts, apikey: publicKey, hash };
};

const fetchAllCharacters = async () => {
    let total = 1;
    let offset = 0;

    while (offset < total) {
        try {
            console.log(`Fetching characters... Offset: ${offset}`);
            const response = await axios.get(BASE_URL, {
                params: { limit: LIMIT, offset, ...getAuthParams() }
            });

            const { results, total: newTotal } = response.data.data;
            allCharacters = allCharacters.concat(results.map(character => character.name));

            total = newTotal;
            offset += LIMIT;

            // Delay to prevent hitting rate limits
            await new Promise(res => setTimeout(res, 500));
        } catch (error) {
            console.error("Error fetching characters:", error);
            break;
        }
    }

    // Save names to a JSON file
    fs.writeFileSync('characters.json', JSON.stringify(allCharacters, null, 2));
    console.log(`Saved ${allCharacters.length} character names to characters.json`);
};

fetchAllCharacters();
