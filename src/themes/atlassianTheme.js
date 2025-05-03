import { createTheme } from '@mui/material/styles';

const atlassianTheme = createTheme({
  palette: {
    primary: { main: '#0052CC', contrastText: '#FFFFFF' },
    secondary: { main: '#FF5630', contrastText: '#FFFFFF' },
    background: { default: '#F4F5F7', paper: '#FFFFFF' },
    text: { primary: '#172B4D', secondary: '#6B778C' },
  },
  typography: {
    fontFamily: "'Outfit','Roboto', sans-serif",
  },
});

export default atlassianTheme;
