import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { createTheme, colors } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import jaJson from './locales/ja.json';
import store from './stores/root';
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
    primary: { main: colors.teal[800] },
    secondary: { main: colors.grey[500] },
  },
});

const App = () => (
  <Provider store={store}>
    <ThemeProvider theme={AppTheme}>
      <Router />
      <ToastContainer autoClose={6000} closeButton={false} draggable={false} position="top-center" />
    </ThemeProvider>
  </Provider>
);

export default App;
