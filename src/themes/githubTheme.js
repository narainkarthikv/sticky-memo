import { createTheme } from '@mui/material/styles';

const githubTheme = createTheme({
  palette: {
    primary: { main: '#24292E', contrastText: '#FFFFFF' },
    secondary: { main: '#0366D6', contrastText: '#FFFFFF' },
    background: { default: '#F6F8FA', paper: '#FFFFFF' },
    text: { primary: '#24292E', secondary: '#586069' },
  },
  typography: {
    fontFamily: "'Segoe UI', 'Helvetica', sans-serif",
  },
});

export default githubTheme;
