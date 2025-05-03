import { createTheme } from '@mui/material/styles';

const azureTheme = createTheme({
  palette: {
    primary: { main: '#0078D4', contrastText: '#FFFFFF' },
    secondary: { main: '#107C10', contrastText: '#FFFFFF' },
    background: { default: '#F3F2F1', paper: '#FFFFFF' },
    text: { primary: '#323130', secondary: '#605E5C' },
  },
  typography: {
    fontFamily: "'Segoe UI', sans-serif",
  },
});

export default azureTheme;
