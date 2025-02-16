import axios from 'axios';
import md5 from 'md5';

const publicKey = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
const privateKey = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
const BASEurl = "https://gateway.marvel.com/v1/public/characters";

// Generate authentication hash
const getAuthParams = () => {
    const timestamp = new Date().getTime();
    const hash = md5(`${timestamp}${privateKey}${publicKey}`);
    return `ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
};

// Function to fetch a character by name 
export const getCharacterByName = async (name) => {
    try {
        const response = await axios.get(`${BASEurl}?name=${name}&${getAuthParams()}`);
        return response.data.data.results;
    } catch (error) {
        console.error(error);
        return [];
    }
};