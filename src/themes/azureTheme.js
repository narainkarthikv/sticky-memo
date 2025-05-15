// src/themes/azureTheme.js
import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#0078D4', contrastText: '#FFFFFF' },  // classic Azure blue
    secondary: { main: '#107C10', contrastText: '#FFFFFF' },  // complementary green
    background:{ default: '#F3F2F1', paper: '#FFFFFF' },      // off‑white neutral
    text:      { primary: '#323130', secondary: '#605E5C' },  // soft dark grey
  },
  typography: {
    fontFamily:  "'Segoe UI', sans-serif",
    h1:          { fontWeight: 600, fontSize: '2rem' },
    h2:          { fontWeight: 600, fontSize: '1.75rem' },
    button:      { textTransform: 'none', fontWeight: 500 },
  },
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#005A9E', contrastText: '#FFFFFF' },  // slightly darker blue
    secondary: { main: '#0B6A0B', contrastText: '#FFFFFF' },  // darker green
    background:{ default: '#1F1F1F', paper: '#2C2C2C' },      // deep greys
    text:      { primary: '#E1E1E1', secondary: '#A6A6A6' },  // high‑contrast light grey
  },
  typography: {
    fontFamily:  "'Segoe UI', sans-serif",
    h1:          { fontWeight: 600, fontSize: '2rem' },
    h2:          { fontWeight: 600, fontSize: '1.75rem' },
    button:      { textTransform: 'none', fontWeight: 500 },
  },
});

export default { light, dark };
