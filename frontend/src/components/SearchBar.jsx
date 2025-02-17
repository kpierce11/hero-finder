import { TextField, Button, Autocomplete } from '@mui/material';
import { useState, useEffect } from 'react';
import {  fetchCharacterNames } from '../api';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    // Load all character names ONCE from the backend for autocomplete
    useEffect(() => {
        const loadNames = async () => {
            try {
                console.log("Loading character names...");
                const names = await fetchCharacterNames();
                console.log("Fetched names:", names);
                setSuggestions(Array.isArray(names) ? names : []);
            } catch (error) {
                console.error("Error fetching character names:", error);
            }
        };
        loadNames();
    }, []);


    // Handle selection from dropdown
    const handleSelect = (event, value) => {
        if (value) {
            console.log("Dropdown selection:", value);
            setQuery(value);
            setTimeout(() => {
                console.log("Triggering search from dropdown...",
                onSearch(value), 0);
            }, 0);
        }
    };

    // Handle pressing Enter
    const handleKeyPress = (event) => {
        if (event.key === "Enter" && query.length >= 3) {
            console.log("Enter pressed, searching for:", query);
            setTimeout(() => {
                console.log("Triggering search from Enter...");
                onSearch(query);
            }, 0);
        }
    };
    
    

    return (
        <div style={{ 
            display: "flex", 
            gap: "10px", 
            marginBottom: "20px", 
            width: "100%", 
            maxWidth: "500px", 
            margin: "0 auto" 
        }}>
            <Autocomplete
                freeSolo
                options={query.length >= 3 ? [...new Set(suggestions)].filter(name => 
                    typeof name === 'string' && name.toLowerCase().startsWith(query.toLowerCase())
                ) : []
                }
                
                onInputChange={(event, newInputValue) => setQuery(newInputValue)}
                onChange={handleSelect}
                sx={{ flexGrow: 1, minWidth: "300px" }} // Maintain proper size
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Search for a Hero"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
                        fullWidth
                    />
                )}
            />
            <Button 
            variant="contained" 
            onClick={() => {
                console.log("Search button clicked, searching for:", query);
                setTimeout(() => {
            console.log("Triggering search from button...");
            onSearch(query);
        }, 0);
    }} 
             style={{ whiteSpace: "nowrap" }} 
             disabled={query.length < 2}
>


                Search
            </Button>
        </div>
    );
};

export default SearchBar;
