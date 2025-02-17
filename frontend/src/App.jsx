import { useState, useEffect } from 'react';
import { ThemeProvider, CssBaseline, Container, Grid2, Typography, Switch, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { fetchCharacter } from './api';
import SearchBar from './components/SearchBar';
import CharacterCard from './components/CharacterCard';

function App() {
    const [characters, setCharacters] = useState([]);
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setDarkMode(prefersDark);
    }, []);

    const handleSearch = async (name) => {
        console.log(`handleSearch called with: ${name}`);

        const results = await fetchCharacter(name);
        console.log("Search API returned:", results);

        if (Array.isArray(results) && results.length > 0) {
            console.log("Setting characters:", results);
            setCharacters(results);
        } else {
            console.warn("No character data found.");
            setCharacters([]); // Clear UI if no data found
        }
    };

    return (
        <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
            <CssBaseline />

            {/* Full page wrapper */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flex-start", // Pushes everything to the top
                    minHeight: "100vh",
                    width: "100vw",
                    textAlign: "center",
                    padding: "40px 20px", // Increased padding for spacing
                    position: "relative",
                }}
            >
                {/* Dark Mode Toggle - Fixed to Top Right */}
                <Box sx={{ 
                    position: "absolute", 
                    top: "10px", 
                    right: "20px", 
                    display: "flex", 
                    alignItems: "center", 
                    gap: "5px" 
                }}>
                    <Typography variant="body1">Dark Mode</Typography>
                    <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                </Box>

                {/* Main Content Wrapper */}
                <Container 
                    maxWidth="md" 
                    sx={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        alignItems: "center",
                        justifyContent: "center",
                        textAlign: "center",
                        width: "100%", 
                        marginTop: "20px",
                        paddingBottom: "80px" // More spacing to prevent overlap
                    }}
                >
                    <Typography variant="h3" sx={{ margin: '20px 0 20px' }}>
                        Hero Finder
                    </Typography>

                    <Box sx={{ marginBottom: "30px" }}> {/* Added spacing below search bar */}
                        <SearchBar onSearch={handleSearch} />
                    </Box>

                    <Grid2 
                        container 
                        spacing={2} 
                        justifyContent="center" 
                        sx={{ width: "100%", display: "flex" }} // Force centering of grid
                    >
                        {characters && characters.map((character) => (
                            <Grid2 item key={character.id} xs={12} sm={6} md={4}>
                                <CharacterCard character={character} />
                            </Grid2>
                        ))}
                    </Grid2>

                    <Typography variant="body2" sx={{ marginTop: '30px', fontSize: '0.8rem' }}>
                        Data provided by <a href="https://developer.marvel.com">this API</a>.
                    </Typography>
                </Container>
            </Box>
        </ThemeProvider>
    );
}

export default App;
