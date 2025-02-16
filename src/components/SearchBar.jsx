import {TextField, Button} from '@mui/material';
import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    return (
        <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            <TextField
            variant="outlined"
            label="Search for a Hero"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            />
            <Button variant="contained" onClick={() => onSearch(query)}>Search</Button>
        </div>
    );
};

export default SearchBar;