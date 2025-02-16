import { useState, useEffect } from 'react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import { lightTheme, darkTheme } from './theme'
import { fetchCharacter } from './api'
import SearchBar from './components/SearchBar'
import CharacterCard from './components/CharacterCard'
import { Container, Grid, Typography, Switch } from '@mui/material'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [characters, setCharacters] = useState([])
  const [darkMode, setDarkMode] = useState(false);

  // Auto-detect dark mode from system preferences
  useEffect(() => {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

  const handleSearch = async (name) => {
    const results = await fetchCharacter(name);
    setCharacters(results);
  };

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      <Container>
        <Typography variant="h3" align="center" sx={{ margin: '20px 0' }}>
          Hero Finder
        </Typography>

        {/* Dark Mode Toggle */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
          <Typography variant="body1">{darkMode ? 'Dark Mode' : 'Light Mode'}</Typography>
        </div>

        <SearchBar onSearch={handleSearch} />
        <Grid container spacing={2}>
          {characters.map((character) => (
            <Grid item key={char.id} xs={12} sm={6} md={4}>
              <CharacterCard character={char} />
            </Grid>
          ))}
        </Grid>

        <Typography variant="body2" align="center" sx={{ marginTop: '20px', fontSize: '0.8rem' }}>
          Data provided by Marvel © 2024 MARVEL. <a href="https://marvel.com">Marvel.com</a>
        </Typography>
      </Container>
    </ThemeProvider>
  );
} 

export default App;
