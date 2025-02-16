import axios from 'axios';
import md5 from 'md5';

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const BASE_URL = "https://gateway.marvel.com/v1/public/characters";

// Generate authentication hash (returns an object instead of a string)
const getAuthParams = () => {
    const timestamp = new Date().getTime();
    const hash = md5(`${timestamp}${privateKey}${publicKey}`);
    return {
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
    };
};

// Function to fetch a character by name 
export const fetchCharacter = async (name) => {
    try {
        const response = await axios.get(`${BASE_URL}?name=${name}&${getAuthParams()}`);
        let results = response.data.data.results;

        // filter out characters that don't have powers

        const powerKeywords = ["powers", "abilities", "superhuman", "mutant", "gamma", "god", "enhanced"];

        results = results.filter(char => {
            char.description &&
            powerKeywords.some(keyword => char.description.toLowerCase().includes(keyword));
        });

        return results;
    } catch (error) {
        console.error(error);
        return [];
    }
};  
