import React from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import App from "./App";
import './main.css';

import { Suspense } from 'react'
import LoadingSpinner from './components/Loading';

import { ThemeProvider } from '@mui/material/styles';
import { useRecoilValue } from 'recoil';
import { themeState } from './utils/state';
import { themes } from './themes';

const AppWrapper = () => {
  const selectedTheme = useRecoilValue(themeState);

  return (
    <ThemeProvider theme={themes[selectedTheme]}>
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
