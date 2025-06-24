import { createTheme } from '@mui/material/styles';

// Airbnb Theme
const airbnb = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#FF5A5F', contrastText: '#FFFFFF' },
      secondary: { main: '#00A699', contrastText: '#FFFFFF' },
      background: { default: '#F7F7F7', paper: '#FFFFFF' },
      text: { primary: '#484848', secondary: '#767676' },
    },
    typography: {
      fontFamily: "Noto Sans, sans-serif",
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#FF5A5F', contrastText: '#FFFFFF' },
      secondary: { main: '#00A699', contrastText: '#FFFFFF' },
      background: { default: '#121212', paper: '#1E1E1E' },
      text: { primary: '#FFFFFF', secondary: '#BDBDBD' },
    },
    typography: {
      fontFamily: "Noto Sans, sans-serif",
    },
  })
};

// Atlassian Theme
const atlassian = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#0052CC', contrastText: '#FFFFFF' },
      secondary: { main: '#FF5630', contrastText: '#FFFFFF' },
      background: { default: '#F4F5F7', paper: '#FFFFFF' },
      text: { primary: '#172B4D', secondary: '#6B778C' },
    },
    typography: {
      fontFamily: "Noto Sans, sans-serif",
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary: { main: '#0052CC', contrastText: '#FFFFFF' },
      secondary: { main: '#FF5630', contrastText: '#FFFFFF' },
      background: { default: '#121212', paper: '#1E1E1E' },
      text: { primary: '#E0E0E0', secondary: '#BDBDBD' },
    },
    typography: {
      fontFamily: "Noto Sans, sans-serif",
    },
  })
};

// Azure Theme
const azure = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary:   { main: '#0078D4', contrastText: '#FFFFFF' },
      secondary: { main: '#107C10', contrastText: '#FFFFFF' },
      background:{ default: '#F3F2F1', paper: '#FFFFFF' },
      text:      { primary: '#323130', secondary: '#605E5C' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 600, fontSize: '2rem' },
      h2:          { fontWeight: 600, fontSize: '1.75rem' },
      button:      { textTransform: 'none', fontWeight: 500 },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary:   { main: '#005A9E', contrastText: '#FFFFFF' },
      secondary: { main: '#0B6A0B', contrastText: '#FFFFFF' },
      background:{ default: '#1F1F1F', paper: '#2C2C2C' },
      text:      { primary: '#E1E1E1', secondary: '#A6A6A6' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 600, fontSize: '2rem' },
      h2:          { fontWeight: 600, fontSize: '1.75rem' },
      button:      { textTransform: 'none', fontWeight: 500 },
    },
  })
};

// Fireflies Theme
const fireflies = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary:   { main: '#FF9800', contrastText: '#FFFFFF' },
      secondary: { main: '#FF5722', contrastText: '#FFFFFF' },
      background:{ default: '#FFF3E0', paper: '#FFFFFF' },
      text:      { primary: '#212121', secondary: '#757575' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 700, fontSize: '2rem' },
      h2:          { fontWeight: 600, fontSize: '1.75rem' },
      button:      { textTransform: 'uppercase', fontWeight: 600 },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary:   { main: '#E65100', contrastText: '#FFFFFF' },
      secondary: { main: '#BF360C', contrastText: '#FFFFFF' },
      background:{ default: '#263238', paper: '#37474F' },
      text:      { primary: '#ECEFF1', secondary: '#B0BEC5' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 700, fontSize: '2rem' },
      h2:          { fontWeight: 600, fontSize: '1.75rem' },
      button:      { textTransform: 'uppercase', fontWeight: 600 },
    },
  })
};

// Spotify Theme
const spotify = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary:   { main: '#1DB954', contrastText: '#FFFFFF' },
      secondary: { main: '#191414', contrastText: '#FFFFFF' },
      background:{ default: '#F5F5F5', paper: '#FFFFFF' },
      text:      { primary: '#191414', secondary: '#535353' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 600, fontSize: '2rem' },
      h2:          { fontWeight: 500, fontSize: '1.5rem' },
      button:      { textTransform: 'none', fontWeight: 600 },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary:   { main: '#1DB954', contrastText: '#000000' },
      secondary: { main: '#040404', contrastText: '#FFFFFF' },
      background:{ default: '#121212', paper: '#181818' },
      text:      { primary: '#FFFFFF', secondary: '#B3B3B3' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 600, fontSize: '2rem' },
      h2:          { fontWeight: 500, fontSize: '1.5rem' },
      button:      { textTransform: 'none', fontWeight: 600 },
    },
  })
};

// Netflix Theme
const netflix = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary:   { main: '#E50914', contrastText: '#FFFFFF' },
      secondary: { main: '#221F1F', contrastText: '#FFFFFF' },
      background:{ default: '#FFFFFF', paper: '#F2F2F2' },
      text:      { primary: '#221F1F', secondary: '#595959' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 700, fontSize: '2rem' },
      h2:          { fontWeight: 600, fontSize: '1.75rem' },
      button:      { textTransform: 'uppercase', fontWeight: 700 },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary:   { main: '#B81D24', contrastText: '#FFFFFF' },
      secondary: { main: '#141414', contrastText: '#FFFFFF' },
      background:{ default: '#121212', paper: '#1E1E1E' },
      text:      { primary: '#FFFFFF', secondary: '#B3B3B3' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 700, fontSize: '2rem' },
      h2:          { fontWeight: 600, fontSize: '1.75rem' },
      button:      { textTransform: 'uppercase', fontWeight: 700 },
    },
  })
};

// Github Theme
const github = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary:   { main: '#24292E', contrastText: '#FFFFFF' },
      secondary: { main: '#0366D6', contrastText: '#FFFFFF' },
      background:{ default: '#F6F8FA', paper: '#FFFFFF' },
      text:      { primary: '#24292E', secondary: '#586069' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 600, fontSize: '1.875rem' },
      h2:          { fontWeight: 600, fontSize: '1.5rem' },
      button:      { textTransform: 'none', fontWeight: 500 },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary:   { main: '#C9D1D9', contrastText: '#000000' },
      secondary: { main: '#79C0FF', contrastText: '#000000' },
      background:{ default: '#0D1117', paper: '#161B22' },
      text:      { primary: '#C9D1D9', secondary: '#8B949E' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 600, fontSize: '1.875rem' },
      h2:          { fontWeight: 600, fontSize: '1.5rem' },
      button:      { textTransform: 'none', fontWeight: 500 },
    },
  })
};

// Dribbble Theme
const dribbble = {
  light: createTheme({
    palette: {
      mode: 'light',
      primary:   { main: '#EA4C89', contrastText: '#FFFFFF' },
      secondary: { main: '#F7F7F7', contrastText: '#000000' },
      background:{ default: '#FFFFFF', paper: '#F7F7F7' },
      text:      { primary: '#333333', secondary: '#757575' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 700, fontSize: '2rem' },
      h2:          { fontWeight: 600, fontSize: '1.75rem' },
      button:      { textTransform: 'none', fontWeight: 600 },
    },
  }),
  dark: createTheme({
    palette: {
      mode: 'dark',
      primary:   { main: '#D6336C', contrastText: '#FFFFFF' },
      secondary: { main: '#212121', contrastText: '#FFFFFF' },
      background:{ default: '#121212', paper: '#1E1E1E' },
      text:      { primary: '#E0E0E0', secondary: '#A0A0A0' },
    },
    typography: {
      fontFamily:  "Noto Sans, sans-serif",
      h1:          { fontWeight: 700, fontSize: '2rem' },
      h2:          { fontWeight: 600, fontSize: '1.75rem' },
      button:      { textTransform: 'none', fontWeight: 600 },
    },
  })
};

export const themes = {
  airbnb,
  atlassian,
  azure,
  fireflies,
  spotify,
  netflix,
  github,
  dribbble,
};