import { AppBar, colors, Link, makeStyles, Typography } from '@mui/material';
import React from 'react';

import { constants } from '../constants';

// const useStyles = makeStyles((theme) => ({
//   appbar: {
//     position: 'static',
//     display: 'block',
//     padding: theme.spacing(2),
//     background: colors.brown[50],
//   },
//   copyright: {
//     color: colors.grey[500],
//     textAlign: 'center',
//   },
// }));

export const Footer = () => {
  return (
    <AppBar
    // className={classes.appbar}
    >
      <Typography
        // className={classes.copyright}
        variant="body2"
        data-testid="footer__copyright"
      >
        {'© '}
        <Link href={constants.url.homepage} target="_blank" color="inherit" underline="always">
          {constants.meta.author}
        </Link>
        {' All Rights Reserved.'}
      </Typography>
    </AppBar>
  );
};
