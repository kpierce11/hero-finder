import axios from 'axios';
import md5 from 'md5';

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;


const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api/characters" // Local backend
    : "https://marvel-backend.onrender.com/api/characters"; // Deployed backend


const getAuthParams = () => {
    const timestamp = new Date().getTime();
    const hash = md5(`${timestamp}${privateKey}${publicKey}`);
    return { ts: timestamp, apikey: publicKey, hash };
};

export const fetchCharacter = async (name) => {
    try {
        const response = await axios.get(BASE_URL, {
            params: { name: name, ...getAuthParams() },
        });
        return response.data.data.results;
    } catch (error) {
        console.error("Error fetching character:", error);
        return [];
    }
};
