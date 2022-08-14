/* istanbul ignore file */
import 'react-toastify/dist/ReactToastify.css';

import { colors, createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import i18n from 'i18next';
import React from 'react';
import { initReactI18next } from 'react-i18next';
import { ToastContainer } from 'react-toastify';

import jaJson from './locales/ja.json';
import Router from './Router';

i18n.use(initReactI18next).init({
  resources: {
    ja: { translation: jaJson },
  },
  lng: 'ja',
  fallbackLng: 'ja',
});

const AppTheme = createTheme({
  palette: {
    primary: { main: colors.brown[300] },
    secondary: { main: colors.grey[500] },
  },
  typography: {
    button: {
      textTransform: 'none',
    },
  },
  overrides: {
    MuiFilledInput: {
      // TextField の下線表示を変更する
      underline: {
        '&:before': {
          borderBottom: 'none',
        },
        '&:after': {
          borderBottom: 'none',
        },
      },
    },
  },
});

const App = () => (
  <ThemeProvider theme={AppTheme}>
    <Router />
    <ToastContainer autoClose={6000} closeButton={false} draggable={false} position="top-center" />
  </ThemeProvider>
);

export default App;
