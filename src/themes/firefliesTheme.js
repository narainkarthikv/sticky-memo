// src/themes/firefliesTheme.js
import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#FF9800', contrastText: '#FFFFFF' },  // vibrant orange
    secondary: { main: '#FF5722', contrastText: '#FFFFFF' },  // complementary deep orange
    background:{ default: '#FFF3E0', paper: '#FFFFFF' },      // warm cream
    text:      { primary: '#212121', secondary: '#757575' },  // dark charcoal
  },
  typography: {
    fontFamily:  "'Poppins', sans-serif",
    h1:          { fontWeight: 700, fontSize: '2rem' },
    h2:          { fontWeight: 600, fontSize: '1.75rem' },
    button:      { textTransform: 'uppercase', fontWeight: 600 },
  },
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#E65100', contrastText: '#FFFFFF' },  // deeper orange
    secondary: { main: '#BF360C', contrastText: '#FFFFFF' },  // burnt red‑orange
    background:{ default: '#263238', paper: '#37474F' },      // cool slate blues
    text:      { primary: '#ECEFF1', secondary: '#B0BEC5' },  // soft ice blues
  },
  typography: {
    fontFamily:  "'Poppins', sans-serif",
    h1:          { fontWeight: 700, fontSize: '2rem' },
    h2:          { fontWeight: 600, fontSize: '1.75rem' },
    button:      { textTransform: 'uppercase', fontWeight: 600 },
  },
});

export default { light, dark };
