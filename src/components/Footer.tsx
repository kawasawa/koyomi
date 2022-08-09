import { AppBar, colors, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

import { constants } from '../constants';

const useStyles = makeStyles((theme) => ({
  appbar: {
    position: 'static',
    display: 'block',
    padding: theme.spacing(2),
    background: colors.brown[50],
  },
}));

export const Footer = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.appbar} color="default">
      <Typography variant="body2" color="textSecondary" align="center" data-testid="footer__copyright">
        {'© '}
        <Link href={constants.url.homepage} color="inherit" underline="always" target="_blank">
          {constants.meta.author}
        </Link>
        {' All Rights Reserved.'}
      </Typography>
    </AppBar>
  );
};
