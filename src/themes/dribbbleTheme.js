import { createTheme } from '@mui/material/styles';

const dribbbleTheme = createTheme({
  palette: {
    primary: { main: '#EA4C89', contrastText: '#FFFFFF' },
    secondary: { main: '#F7F7F7', contrastText: '#000000' },
    background: { default: '#FFFFFF', paper: '#F7F7F7' },
    text: { primary: '#333333', secondary: '#757575' },
  },
  typography: {
    fontFamily: "'Poppins', 'Helvetica', sans-serif",
  },
});

export default dribbbleTheme;
