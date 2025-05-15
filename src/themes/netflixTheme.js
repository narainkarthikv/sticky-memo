import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#E50914', contrastText: '#FFFFFF' },
    secondary: { main: '#221F1F', contrastText: '#FFFFFF' },
    background:{ default: '#FFFFFF', paper: '#F2F2F2' },
    text:      { primary: '#221F1F', secondary: '#595959' },
  },
  typography: {
    fontFamily:  "'Roboto', sans-serif",
    h1:          { fontWeight: 700, fontSize: '2rem' },
    h2:          { fontWeight: 600, fontSize: '1.75rem' },
    button:      { textTransform: 'uppercase', fontWeight: 700 },
  },
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#B81D24', contrastText: '#FFFFFF' },
    secondary: { main: '#141414', contrastText: '#FFFFFF' },
    background:{ default: '#121212', paper: '#1E1E1E' },
    text:      { primary: '#FFFFFF', secondary: '#B3B3B3' },
  },
  typography: {
    fontFamily:  "'Roboto', sans-serif",
    h1:          { fontWeight: 700, fontSize: '2rem' },
    h2:          { fontWeight: 600, fontSize: '1.75rem' },
    button:      { textTransform: 'uppercase', fontWeight: 700 },
  },
});

export default { light, dark };