import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#EA4C89', contrastText: '#FFFFFF' },
    secondary: { main: '#F7F7F7', contrastText: '#000000' },
    background:{ default: '#FFFFFF', paper: '#F7F7F7' },
    text:      { primary: '#333333', secondary: '#757575' },
  },
  typography: {
    fontFamily:  "'Poppins', 'Helvetica', sans-serif",
    h1:          { fontWeight: 700, fontSize: '2rem' },
    h2:          { fontWeight: 600, fontSize: '1.75rem' },
    button:      { textTransform: 'none', fontWeight: 600 },
  },
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#D6336C', contrastText: '#FFFFFF' },
    secondary: { main: '#212121', contrastText: '#FFFFFF' },
    background:{ default: '#121212', paper: '#1E1E1E' },
    text:      { primary: '#E0E0E0', secondary: '#A0A0A0' },
  },
  typography: {
    fontFamily:  "'Poppins', 'Helvetica', sans-serif",
    h1:          { fontWeight: 700, fontSize: '2rem' },
    h2:          { fontWeight: 600, fontSize: '1.75rem' },
    button:      { textTransform: 'none', fontWeight: 600 },
  },
});

export default { light, dark };
