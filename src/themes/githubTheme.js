import { createTheme } from '@mui/material/styles';

const light = createTheme({
  palette: {
    mode: 'light',
    primary:   { main: '#24292E', contrastText: '#FFFFFF' },
    secondary: { main: '#0366D6', contrastText: '#FFFFFF' },
    background:{ default: '#F6F8FA', paper: '#FFFFFF' },
    text:      { primary: '#24292E', secondary: '#586069' },
  },
  typography: {
    fontFamily:  "'Segoe UI', 'Helvetica', sans-serif",
    h1:          { fontWeight: 600, fontSize: '1.875rem' },
    h2:          { fontWeight: 600, fontSize: '1.5rem' },
    button:      { textTransform: 'none', fontWeight: 500 },
  },
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary:   { main: '#C9D1D9', contrastText: '#000000' },
    secondary: { main: '#79C0FF', contrastText: '#000000' },
    background:{ default: '#0D1117', paper: '#161B22' },
    text:      { primary: '#C9D1D9', secondary: '#8B949E' },
  },
  typography: {
    fontFamily:  "'Segoe UI', 'Helvetica', sans-serif",
    h1:          { fontWeight: 600, fontSize: '1.875rem' },
    h2:          { fontWeight: 600, fontSize: '1.5rem' },
    button:      { textTransform: 'none', fontWeight: 500 },
  },
});

export default { light, dark };