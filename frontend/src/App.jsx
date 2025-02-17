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
                  justifyContent: "center",
                  minHeight: "100vh",
                  width: "100vw", // Ensure full viewport width
                  textAlign: "center",
                  padding: "20px",
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
  
              {/* Main Content Wrapper - Centers Everything */}
              <Container 
                  maxWidth="md" 
                  sx={{ 
                      display: "flex", 
                      flexDirection: "column", 
                      alignItems: "center",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%", 
                  }}
              >
                  <Typography variant="h3" sx={{ margin: '40px 0 20px' }}>
                      Hero Finder
                  </Typography>
  
                  <SearchBar onSearch={handleSearch} />
  
                  <Grid2 
                      container 
                      spacing={2} 
                      justifyContent="center" 
                      sx={{ width: "100%", display: "flex" }} // Force centering of grid
                  >
                      {characters && characters.map((character) => (
                          <Grid2 item key ={character.id} xs={12} sm={6} md={4}>
                              <CharacterCard character={character} />
                          </Grid2>
                      ))}
                  </Grid2>
  
                  <Typography variant="body2" sx={{ marginTop: '20px', fontSize: '0.8rem' }}>
                      Data provided by <a href="https://developer.marvel.com">this API</a>.
                  </Typography>
              </Container>
          </Box>
      </ThemeProvider>
  );
  }  

export default App;
