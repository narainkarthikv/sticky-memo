import { createTheme } from '@mui/material/styles';

const airbnbTheme = createTheme({
  palette: {
    primary: { main: '#FF5A5F', contrastText: '#FFFFFF' },
    secondary: { main: '#00A699', contrastText: '#FFFFFF' },
    background: { default: '#F7F7F7', paper: '#FFFFFF' },
    text: { primary: '#484848', secondary: '#767676' },
  },
  typography: {
    fontFamily: "'Airbnb Cereal', 'Helvetica', sans-serif",
  },
});

export default airbnbTheme;
