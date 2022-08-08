import { AppBar, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import { APP_AUTHOR, URL_CREATORPAGE } from '../constants';

const useStyles = makeStyles((theme) => ({
  appbar: {
    position: 'static',
    display: 'block',
    padding: theme.spacing(2),
  },
}));

export const Footer = () => {
  console.log('DEBUG: render Copyright');

  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} color="default">
      <Typography variant="body2" color="textSecondary" align="center" data-testid="footer__copyright">
        {'© '}
        <Link color="inherit" href={URL_CREATORPAGE} target="_blank">
          {APP_AUTHOR}
        </Link>
        {' All Rights Reserved.'}
      </Typography>
    </AppBar>
  );
};
