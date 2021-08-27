import { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { createMuiTheme, colors } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';
import 'react-toastify/dist/ReactToastify.css';

import Top from './pages/Top';

const AppTheme = createMuiTheme({
  palette: {
    primary: { main: colors.teal[800] },
    secondary: { main: colors.grey[500] },
  },
});

const App = () => {
  return (
    <Fragment>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <ThemeProvider theme={AppTheme}>
          <Switch>
            <Route path="/:date?" component={Top} />
          </Switch>
        </ThemeProvider>
      </BrowserRouter>
      <ToastContainer autoClose={6000} closeButton={false} draggable={false} position="top-center" />
    </Fragment>
  );
};

export default App;
