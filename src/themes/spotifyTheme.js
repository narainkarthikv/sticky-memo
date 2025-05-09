import { createTheme } from '@mui/material/styles';

const spotifyTheme = createTheme({
  palette: {
    primary: { main: '#1DB954', contrastText: '#FFFFFF' },
    secondary: { main: '#191414', contrastText: '#FFFFFF' },
    background: { default: '#121212', paper: '#181818' },
    text: { primary: '#FFFFFF', secondary: '#B3B3B3' },
  },
  typography: {
    fontFamily: "'Circular', 'Helvetica', sans-serif",
  },
});

export default spotifyTheme;
