import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot, useRecoilState } from 'recoil';
import App from "./App";
import './main.css';

import { Suspense } from 'react'
import LoadingSpinner from './components/Loading';

import { ThemeProvider } from '@mui/material/styles';
import { themeModeState, themeState } from './utils/state';
import { themes } from './themes';
import { CssBaseline } from '@mui/material';

const AppWrapper = () => {
  const [selectedTheme] = useRecoilState(themeState);
  // Atom for mode: 'light' or 'dark'
  const [mode] = useRecoilState(themeModeState);
  // Safely resolve theme, fallback to airbnb.light if missing
  const theme = (themes[selectedTheme] && themes[selectedTheme][mode]) || themes.airbnb.light;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <Suspense fallback={<LoadingSpinner />}>
        <AppWrapper />
      </Suspense>
    </RecoilRoot>
  </React.StrictMode>
);
