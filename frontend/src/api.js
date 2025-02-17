const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000/api" // Local backend
    : "https://your-backend-on-render.com/api"; // Replace with your deployed Render backend

    export const fetchCharacterNames = async () => {
        try {
            console.log("Fetching character names from backend...");
            const response = await fetch(`${BASE_URL}/local-characters`);
            const names = await response.json();
            console.log("Fetched character names:", names); // Debugging
            return Array.isArray(names) ? names : [];
        } catch (error) {
            console.error("Error fetching character names:", error);
            return [];
        }
    };
    

    export const fetchCharacter = async (name) => {
        try {
            console.log(`Fetching character from backend: ${name}`);
            const response = await fetch(`${BASE_URL}/characters?name=${encodeURIComponent(name)}`);
            const data = await response.json();
            
            console.log("Full API response:", data);
    
            // Ensure correct extraction of character data
            if (data && data.data && Array.isArray(data.data.results)) {
                console.log("Extracted character data:", data.data.results);
                return data.data.results; //
            } else {
                console.warn("Unexpected API response format:", data);
                return []; // Return empty array if the structure is incorrect
            }
        } catch (error) {
            console.error("Error fetching character:", error);
            return [];
        }
    };
    
    
