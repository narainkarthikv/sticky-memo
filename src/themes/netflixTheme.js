import { createTheme } from '@mui/material/styles';

const netflixTheme = createTheme({
  palette: {
    primary: { main: '#E50914', contrastText: '#FFFFFF' },
    secondary: { main: '#221F1F', contrastText: '#FFFFFF' },
    background: { default: '#141414', paper: '#221F1F' },
    text: { primary: '#FFFFFF', secondary: '#B3B3B3' },
  },
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
});

export default netflixTheme;
