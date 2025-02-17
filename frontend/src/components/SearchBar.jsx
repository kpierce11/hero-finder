import { TextField, Button, Autocomplete } from '@mui/material';
import { useState, useEffect } from 'react';
import { fetchCharacter } from '../api';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        if (query.length > 1) {
            fetchCharacter(query).then((results) => {
                setSuggestions(results.map((char) => char.name));
            });
        } else {
            setSuggestions([]);
        }
    }, [query]);

    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            onSearch(query);
        }
    };

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px", width: "100%", maxWidth: "500px", margin: "0 auto" }}>
            <Autocomplete
                freeSolo
                options={suggestions}
                onInputChange={(event, newInputValue) => setQuery(newInputValue)}
                onChange={(event, newValue) => {
                    if (newValue) {
                        onSearch(newValue);
                    }
                }}
                style={{ flexGrow: 1, minWidth: "300px" }} // Forces it to take up full width
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Search for a Hero"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyPress}
                        fullWidth // Ensures text field takes full space
                    />
                )}
            />
            <Button variant="contained" onClick={() => onSearch(query)} style={{ whiteSpace: "nowrap" }}>
                Search
            </Button>
        </div>
    );
};

export default SearchBar;
