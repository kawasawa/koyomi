import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createTheme, colors } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';

import jaJson from './locales/ja.json';
import Top from './pages/Top';

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

const App = () => {
  return (
    <>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ThemeProvider theme={AppTheme}>
          <Switch>
            <Route path="/:date?" component={Top} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
      <ToastContainer autoClose={6000} closeButton={false} draggable={false} position="top-center" />
    </>
  );
};

export default App;
