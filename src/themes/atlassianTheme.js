import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0052CC', contrastText: '#FFFFFF' },
    secondary: { main: '#FF5630', contrastText: '#FFFFFF' },
    background: { default: '#F4F5F7', paper: '#FFFFFF' },
    text: { primary: '#172B4D', secondary: '#6B778C' },
  },
  typography: {
    fontFamily: "'Outfit','Roboto', sans-serif",
  },
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0052CC', contrastText: '#FFFFFF' },
    secondary: { main: '#FF5630', contrastText: '#FFFFFF' },
    background: { default: '#121212', paper: '#1E1E1E' },
    text: { primary: '#E0E0E0', secondary: '#BDBDBD' },
  },
  typography: {
    fontFamily: "'Outfit','Roboto', sans-serif",
  },
});

export default { light, dark };