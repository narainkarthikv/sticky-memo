import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#1DB954', contrastText: '#FFFFFF' },
    secondary: { main: '#191414', contrastText: '#FFFFFF' },
    background:{ default: '#F5F5F5', paper: '#FFFFFF' },
    text:      { primary: '#191414', secondary: '#535353' },
  },
  typography: {
    fontFamily:  "'Circular', 'Helvetica', sans-serif",
    h1:          { fontWeight: 600, fontSize: '2rem' },
    h2:          { fontWeight: 500, fontSize: '1.5rem' },
    button:      { textTransform: 'none', fontWeight: 600 },
  },
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#1DB954', contrastText: '#000000' },
    secondary: { main: '#040404', contrastText: '#FFFFFF' },
    background:{ default: '#121212', paper: '#181818' },
    text:      { primary: '#FFFFFF', secondary: '#B3B3B3' },
  },
  typography: {
    fontFamily:  "'Circular', 'Helvetica', sans-serif",
    h1:          { fontWeight: 600, fontSize: '2rem' },
    h2:          { fontWeight: 500, fontSize: '1.5rem' },
    button:      { textTransform: 'none', fontWeight: 600 },
  },
});

export default { light, dark };