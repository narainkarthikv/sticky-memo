import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#FF5A5F', contrastText: '#FFFFFF' },
    secondary: { main: '#00A699', contrastText: '#FFFFFF' },
    background: { default: '#F7F7F7', paper: '#FFFFFF' },
    text: { primary: '#484848', secondary: '#767676' },
  },
  typography: {
    fontFamily: "'Airbnb Cereal', 'Helvetica', sans-serif",
  },
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#FF5A5F', contrastText: '#FFFFFF' },
    secondary: { main: '#00A699', contrastText: '#FFFFFF' },
    background: { default: '#121212', paper: '#1E1E1E' },
    text: { primary: '#FFFFFF', secondary: '#BDBDBD' },
  },
  typography: {
    fontFamily: "'Airbnb Cereal', 'Helvetica', sans-serif",
  },
});

export default { light, dark };