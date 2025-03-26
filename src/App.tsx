import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { useState, useMemo } from 'react';
import Sidebar from './layouts/Sidebar';
import MainContent from './components/MainContent';
import Navbar from './layouts/Navbar';

function App() {
  const [mode, setMode] = useState<'light' | 'dark'>('dark');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'dark' ? {
            background: {
              default: '#121212',
              paper: '#1a1a1a',
            }
          } : {
            background: {
              default: '#f5f5f5',
              paper: '#ffffff',
            }
          })
        },
      }),
    [mode],
  );

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar onToggleTheme={toggleTheme} isDarkMode={mode === 'dark'} />
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Sidebar />
          <MainContent />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
