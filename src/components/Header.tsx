import { AppBar, makeStyles, Toolbar } from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { AppLogo } from './AppLogo';
import { DrawerMenu } from './DrawerMenu';

const useStyles = makeStyles((theme) => ({
  appbar: {
    position: 'sticky',
    display: 'block',
  },
  applogo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
    },
  },
}));

export const Header = ({ children }: { children?: React.ReactNode }) => {
  console.log('DEBUG: render Header');
  const [t] = useTranslation();

  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} color="default">
      <Toolbar>
        <DrawerMenu anchor="left" />
        <AppLogo className={classes.applogo} />
        <div style={{ flex: '1 0 0' }} />
        {children}
      </Toolbar>
    </AppBar>
  );
};
