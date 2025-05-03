import { createTheme } from '@mui/material/styles';

const firefliesTheme = createTheme({
  palette: {
    primary: { main: '#FF9800', contrastText: '#FFFFFF' },
    secondary: { main: '#FF5722', contrastText: '#FFFFFF' },
    background: { default: '#FFF3E0', paper: '#FFFFFF' },
    text: { primary: '#212121', secondary: '#757575' },
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
  },
});

export default firefliesTheme;
